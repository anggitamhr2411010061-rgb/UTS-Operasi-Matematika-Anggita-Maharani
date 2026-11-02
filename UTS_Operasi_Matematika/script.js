
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("calculatorForm");
    const hasil = document.getElementById("hasil");
    const activityList = document.getElementById("activityList");
    const clearButton = document.getElementById("clearActivity");

    let activities = JSON.parse(
        localStorage.getItem("activities") || "[]"
    );

    // Menampilkan riwayat
    function showActivities() {
        if (!activityList) return;

        activityList.innerHTML = "";

        if (activities.length === 0) {
            activityList.innerHTML =
                "<li>Belum ada aktivitas.</li>";
            return;
        }

        activities.forEach(function (activity) {
            const li = document.createElement("li");
            li.textContent = activity;
            activityList.appendChild(li);
        });
    }

    // Mencatat aktivitas
    function recordActivity(message) {
        const waktu = new Date().toLocaleString("id-ID");

        activities.unshift(waktu + " - " + message);

        localStorage.setItem(
            "activities",
            JSON.stringify(activities)
        );

        showActivities();
    }

    // Menghitung operasi matematika
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const angka1 = parseFloat(
            document.getElementById("angka1").value
        );

        const angka2 = parseFloat(
            document.getElementById("angka2").value
        );

        const operasi =
            document.getElementById("operasi").value;

        if (isNaN(angka1) || isNaN(angka2)) {
            hasil.textContent = "Masukkan kedua angka terlebih dahulu.";
            return;
        }

        let hasilHitung;
        let simbol;

        switch (operasi) {
            case "tambah":
                hasilHitung = angka1 + angka2;
                simbol = "+";
                break;

            case "kurang":
                hasilHitung = angka1 - angka2;
                simbol = "-";
                break;

            case "kali":
                hasilHitung = angka1 * angka2;
                simbol = "×";
                break;

            case "bagi":
                if (angka2 === 0) {
                    hasil.textContent =
                        "Error! Tidak dapat membagi dengan nol.";
                    recordActivity("Percobaan pembagian dengan nol");
                    return;
                }

                hasilHitung = angka1 / angka2;
                simbol = "÷";
                break;

            default:
                hasil.textContent =
                    "Silakan pilih operasi matematika.";
                return;
        }

        hasil.textContent =
            angka1 + " " + simbol + " " +
            angka2 + " = " + hasilHitung;

        recordActivity(
            angka1 + " " + simbol + " " +
            angka2 + " = " + hasilHitung
        );
    });

    // Menghapus riwayat
    if (clearButton) {
        clearButton.addEventListener("click", function () {
            activities = [];
            localStorage.removeItem("activities");
            showActivities();

            hasil.textContent =
                "Riwayat aktivitas berhasil dihapus.";
        });
    }

    showActivities();

});
