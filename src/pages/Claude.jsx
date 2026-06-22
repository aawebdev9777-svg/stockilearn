import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileCode, Download, Loader2 } from "lucide-react";

const codeModules = import.meta.glob("../**/*.{js,jsx,ts,tsx,json,css}", {
  query: "?raw",
  import: "default",
});

export default function Claude() {
  const [generating, setGenerating] = useState(false);
  const filePaths = Object.keys(codeModules).sort();

  const generatePdf = async () => {
    setGenerating(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 40;
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      // Title block
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("StockiLearn — Full Source Code", margin, y + 14);
      y += 30;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
      y += 14;
      doc.text(`Files: ${filePaths.length}`, margin, y);
      y += 24;

      for (const path of filePaths) {
        const content = await codeModules[path]();
        const displayName = path.replace(/^\.\.\//, "");

        // File header bar
        if (y > pageHeight - 50) { doc.addPage(); y = margin; }
        doc.setFillColor(230, 240, 255);
        doc.rect(margin, y - 10, maxWidth, 18, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(20, 80, 160);
        doc.text(displayName, margin + 4, y + 2);
        doc.setTextColor(0, 0, 0);
        y += 16;

        // Code body
        doc.setFont("courier", "normal");
        doc.setFontSize(7);
        const lines = doc.splitTextToSize(content, maxWidth);
        for (const line of lines) {
          if (y > pageHeight - margin) { doc.addPage(); y = margin; }
          doc.text(line, margin, y);
          y += 8;
        }
        y += 12;
      }

      doc.save("stockilearn-source-code.pdf");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-lg w-full p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <FileCode className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Source Code PDF</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Download every source file in the app as a single PDF document.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{filePaths.length}</span> files included
        </p>
        <Button onClick={generatePdf} disabled={generating} size="lg" className="w-full">
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {generating ? "Generating..." : "Download PDF"}
        </Button>
      </Card>
    </div>
  );
}