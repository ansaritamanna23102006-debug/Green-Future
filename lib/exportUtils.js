/**
 * Client-side file and CSV export utility for the Super Admin Panel
 */

export function downloadCSV(filenameOrData, headersOrFilename, maybeRows) {
  if (typeof window === "undefined") return;

  let filename = "export.csv";
  let headers = [];
  let rows = [];

  // Case 1: downloadCSV(dataArray, filename)
  if (Array.isArray(filenameOrData)) {
    const data = filenameOrData;
    filename = typeof headersOrFilename === "string" ? headersOrFilename : "export.csv";
    if (data.length > 0) {
      headers = Object.keys(data[0]);
      rows = data.map((item) => headers.map((h) => item[h] ?? ""));
    }
  }
  // Case 2: downloadCSV(filename, dataArray) where dataArray is an array of objects
  else if (typeof filenameOrData === "string" && Array.isArray(headersOrFilename) && headersOrFilename.length > 0 && typeof headersOrFilename[0] === "object" && !Array.isArray(headersOrFilename[0])) {
    filename = filenameOrData;
    const data = headersOrFilename;
    headers = Object.keys(data[0]);
    rows = data.map((item) => headers.map((h) => item[h] ?? ""));
  }
  // Case 3: downloadCSV(filename, headers, rows)
  else {
    filename = typeof filenameOrData === "string" ? filenameOrData : "export.csv";
    headers = Array.isArray(headersOrFilename) ? headersOrFilename : [];
    rows = Array.isArray(maybeRows) ? maybeRows : [];
  }

  const escapeCell = (val) => {
    if (val === null || val === undefined) return '""';
    const text = String(val).replace(/"/g, '""');
    return `"${text}"`;
  };

  const headerLine = headers.map(escapeCell).join(",");
  const dataLines = rows.map((row) =>
    Array.isArray(row)
      ? row.map(escapeCell).join(",")
      : headers.map((h) => escapeCell(row[h] ?? "")).join(",")
  );

  const csvContent = "\uFEFF" + [headerLine, ...dataLines].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadTextReport(filename, title, sections) {
  if (typeof window === "undefined") return;

  let content = `==========================================================\n`;
  content += `  GREEN FUTURE TECH (GFT) - OFFICIAL SYSTEM REPORT\n`;
  content += `  ${title.toUpperCase()}\n`;
  content += `  Generated: ${new Date().toLocaleString()}\n`;
  content += `==========================================================\n\n`;

  sections.forEach((sec) => {
    content += `--- ${sec.title.toUpperCase()} ---\n`;
    if (Array.isArray(sec.data)) {
      sec.data.forEach((item) => {
        content += typeof item === "string" ? `• ${item}\n` : `• ${JSON.stringify(item)}\n`;
      });
    } else if (typeof sec.data === "object" && sec.data !== null) {
      Object.entries(sec.data).forEach(([k, v]) => {
        content += `${k.padEnd(25)}: ${v}\n`;
      });
    } else {
      content += `${sec.data}\n`;
    }
    content += `\n`;
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename.endsWith(".txt") ? filename : `${filename}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
