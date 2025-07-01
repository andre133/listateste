(() => {
  const getPatientData = () => {
    const turnoLabel = document.querySelector('input[type="radio"]:checked + label');
    const turno = turnoLabel?.textContent?.trim()?.[0] || '';

    const prontuario = document.querySelector('#ext-comp-1103')?.value?.trim() || '';
    const cpf = document.querySelector('#ext-comp-1104')?.value?.trim() || '';
    const nascimento = document.querySelector('#ext-comp-1105')?.value?.trim() || '';
    const sexo = document.querySelector('#ext-comp-1106')?.value?.trim()?.[0]?.toUpperCase() || '';

    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'))
      .slice(0, 41)
      .map(cb => cb.checked ? 'X' : '');

    return [turno, prontuario, cpf, cpf, nascimento, sexo, ...checkboxes];
  };

  const data = getPatientData();

  const ws_data = Array.from({ length: 47 }, (_, i) => [data[i] || '']);
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Paciente");

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "paciente.xlsx";
  a.click();
  URL.revokeObjectURL(url);
})();
