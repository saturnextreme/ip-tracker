

export const getLocation = (ip) => {
    const result = fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_zNuMJUlCLlVPKNFI0pcMsVIUcpBfV&ipAddress=${ip}`);
    return result;
}
