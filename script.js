const OPENAI_API_KEY = "PUT-YOUR-KEY-HERE"; // 👈 Replace with your key

async function askAI() {
  const questionInput = document.getElementById("question");
  const chatBox = document.getElementById("chat");
  const question = questionInput.value.trim();
  if (!question) return;

  chatBox.innerHTML += `<p><b>You:</b> ${question}</p>`;
  questionInput.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful AI assistant inside a web app." },
          { role: "user", content: question }
        ]
      }),
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    chatBox.innerHTML += `<p><b>AI:</b> ${answer}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<p style="color:red"><b>Error:</b> ${err.message}</p>`;
  }
}
