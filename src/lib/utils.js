export function extractPlainText(glpiDescription) {
    if (!glpiDescription) return 'Sem descrição';

    // 1. Decodifica as entidades HTML numéricas e nomeadas mais comuns do GLPI
    let text = glpiDescription
        .replace(/&#60;/g, '<')
        .replace(/&#62;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');

    // 2. Substitui tags de quebra de linha por um espaço, para as palavras não grudarem
    text = text.replace(/<br\s*[\/]?>/gi, ' ');

    // 3. Remove todas as outras tags HTML (tudo que estiver entre < e >)
    text = text.replace(/<\/?[^>]+(>|$)/g, "");

    // 4. Remove espaços duplos ou múltiplos gerados pelo passo anterior
    return text.replace(/\s+/g, ' ').trim();
}