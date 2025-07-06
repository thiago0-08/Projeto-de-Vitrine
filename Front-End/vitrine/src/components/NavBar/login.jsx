const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch('https://localhost:7066/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Login realizado com sucesso!");
    navigate("/lancamentos"); // ✅ redireciona para a página de lançamentos
  } else {
    alert(data.mensagem || "Login inválido.");
  }
};
