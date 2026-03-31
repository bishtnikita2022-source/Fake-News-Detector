function checkNews() {
    let input = document.getElementById("newsInput").value;

    if (input.trim() === "") {
        alert("Please enter news text!");
        return;
    }

    let text = input.toLowerCase();

    // 🔴 Fake keywords
    let isFake = text.includes("breaking") || 
                 text.includes("!!!") || 
                 text.includes("shocking") || 
                 text.includes("urgent") || 
                 text.includes("fake") || 
                 text.includes("secretly") || 
                 text.includes("viral") || 
                 text.includes("share") || 
                 text.includes("forward") || 
                 text.includes("click here") || 
                 text.includes("won't believe");

    // 🟢 Real keywords
    let isReal = text.includes("announced") || 
                 text.includes("government") || 
                 text.includes("official") || 
                 text.includes("report") || 
                 text.includes("policy") || 
                 text.includes("authorities") || 
                 text.includes("warned") || 
                 text.includes("economic") || 
                 text.includes("research") || 
                 text.includes("study") || 
                 text.includes("ministry");

    let prediction = "";
    let confidence = 0;

    // ✅ Decision logic
    if (!isFake && !isReal) {
        prediction = "UNCERTAIN";
        confidence = 50;
    } 
    else if (isFake && !isReal) {
        prediction = "FAKE";
        confidence = 85;
    } 
    else if (!isFake && isReal) {
        prediction = "REAL";
        confidence = 85;
    } 
    else if (isFake && isReal) {
        prediction = "FAKE";  // 🔥 fake gets priority
        confidence = 80;
    }

    // UI update
    document.getElementById("prediction").innerText = prediction;
    document.getElementById("confidence").innerText = confidence + "%";

    let bar = document.getElementById("confidenceBar");
    bar.style.width = confidence + "%";

    // Color change
    if (prediction === "FAKE") {
        bar.style.background = "#e74c3c"; // red
    } else if (prediction === "REAL") {
        bar.style.background = "#2ecc71"; // green
    } else {
        bar.style.background = "#f39c12"; // orange for UNCERTAIN
    }
}