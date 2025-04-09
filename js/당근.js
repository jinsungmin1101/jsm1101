function toggleDropdown() {
    var dropdown = document.getElementById("dropdown");

    // 현재 상태에 따라 드롭다운을 표시하거나 숨김
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

function selectLocation(location) {
    document.getElementById("selected-location").innerText = location + " ▼";
    document.getElementById("dropdown").style.display = "none";
}

// 클릭한 곳이 드롭다운 밖이면 닫기
document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("dropdown");
    var bonggok = document.querySelector(".bonggok");
    if (!bonggok.contains(event.target)) {
        dropdown.style.display = "none";
    }
});
