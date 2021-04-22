export function getGoogleDriveIframeLink(file) {
  const type =
    {
      // https://docs.google.com/presentation/d/1l5l4ctSUt3rBtojprP60HCLarS7jryZArY-5mAlBm_g/edit
      ppt: 'presentation',
      pptx: 'presentation',
      // https://docs.google.com/spreadsheets/d/0BwLlItXN6SRuWHlpakdpS2ltdHM/edit
      xls: 'spreadsheets',
      xlsx: 'spreadsheets',
      csv: 'spreadsheets',
      // https://docs.google.com/document/d/0BwLlItXN6SRuRDdBOFR0TExDbHc/edit
      doc: 'document',
      docx: 'document',
      // https://docs.google.com/drawings/d/1sMeeh3GZgVG2xUY5fxmhQA7meHjzDJEaDam-xRWA5Dw/edit
      pdf: 'download',
    }[file.extension] || 'file';

  if (type === 'file') {
    if (file.id.includes('drawing')) {
      //.png
      return `{{iframe: https://docs.google.com/drawings/d/${file.data.id}/edit}}`;
    } else if (file.type === 'image/jpeg') {
      // images
      const imageUrl = file.preview.replace('=s220', '');
      return `![${file.name}](${imageUrl})`;
    } else {
      return `{{iframe: https://docs.google.com/${type}/d/${file.data.id}/edit}}`;
    }
  } else if (type === 'download') {
    return `{{pdf: https://docs.google.com/file/d/${file.data.id}/preview}}`;
  } else {
    return `{{iframe: https://docs.google.com/${type}/d/${file.data.id}/edit}}`;
  }
}
