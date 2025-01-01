export const copyText = (text: string) => {
  if (document) {
    document.execCommand("copy");
    const el = document.createElement("textarea");

    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};
