export function formatAddress(address) {
  if (!address || typeof address !== "object") {
    return "Endereço inválido"; // Retorna uma mensagem de erro se o endereço for inválido
  }

  // Extrai os campos do endereço
  const { street, number, neighborhood, city, state } = address;

  // Cria a string formatada, tratando o número como opcional
  const formattedAddress = [
    street,
    number ? `, ${number}` : ", S/N",
    neighborhood ? `, ${neighborhood}` : "", 
    city ? `, ${city}` : "",
    state ? ` - ${state}` : "", 
  ]
    .filter(Boolean) 
    .join(""); 

  return formattedAddress.trim(); 
}