export function getOneDriveIframeLink(file) {
  const type =
    {
      // https://onedrive.live.com/edit.aspx?page=view&resid=879869B902DC45E2!1098&app=PowerPoint
      ppt: 'PowerPoint',
      pptx: 'PowerPoint',
      // https://onedrive.live.com/edit.aspx?page=view&resid=879869B902DC45E2!1109&app=Excel
      xls: 'Excel',
      xlsx: 'Excel',
      csv: 'Excel',
      // https://onedrive.live.com/edit.aspx?page=view&resid=879869B902DC45E2!1113&app=Word
      doc: 'Word',
      docx: 'Word',
      // https://onedrive.live.com/pdf?resid=879869B902DC45E2%211092&open=1&serve=1
      pdf: 'PDF',
    }[file.extension] || 'file';

  if (type === 'file') {
    return `![${file.name}](${file.preview})`;
  } else if (type === 'PDF') {
    return `{{iframe: https://onedrive.live.com/pdf?resid=${file.data.id}&open=1&serve=1}}`;
  } else {
    // iframe will be redirect
    // return (`{{iframe: https://onedrive.live.com/edit.aspx?page=view&resid=${file.data.id}&app=${type}}}`)
    return `{{iframe: https://onedrive.live.com/embed?resid=${file.data.id}}}`;
  }
}
