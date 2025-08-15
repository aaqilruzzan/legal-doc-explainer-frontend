declare module "html2pdf.js" {
  interface Options {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number };
    jsPDF?: { unit?: string; format?: string; orientation?: string };
  }

  function html2pdf(): {
    from(element: HTMLElement): any;
    set(options: Options): any;
    save(): Promise<void>;
  };

  export default html2pdf;
}
