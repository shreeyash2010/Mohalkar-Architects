import { jsPDF } from "jspdf";
import { ProjectItem } from "../data/projectsData";

interface LoadedImageInfo {
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Loads an image from URL and returns a base64 Data URL along with natural dimensions for jsPDF.
 */
async function getBase64ImageFromUrl(imageUrl: string): Promise<LoadedImageInfo | null> {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const naturalW = img.naturalWidth || img.width || 1200;
        const naturalH = img.naturalHeight || img.height || 800;
        const canvas = document.createElement("canvas");
        canvas.width = naturalW;
        canvas.height = naturalH;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        resolve({
          dataUrl,
          width: naturalW,
          height: naturalH,
        });
      } catch (e) {
        console.warn("Canvas export failed for image:", imageUrl, e);
        resolve(null);
      }
    };
    img.onerror = () => {
      console.warn("Failed to load image for PDF:", imageUrl);
      resolve(null);
    };
    img.src = imageUrl;
  });
}

/**
 * Draws the signature Mohalkar Architectural Blueprint canvas, grid, borders and registration marks.
 */
function drawArchitecturalBlueprintCanvas(
  doc: jsPDF,
  pageWidth: number,
  pageHeight: number
) {
  // Background Canvas - Deep Architectural Blueprint Midnight (#0b111e)
  doc.setFillColor(11, 17, 30);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Subtle Architectural Blueprint Grid (Lines every 10mm)
  doc.setDrawColor(20, 32, 54);
  doc.setLineWidth(0.15);
  for (let x = 10; x < pageWidth; x += 10) {
    doc.line(x, 8, x, pageHeight - 8);
  }
  for (let y = 10; y < pageHeight; y += 10) {
    doc.line(8, y, pageWidth - 8, y);
  }

  // Outer Blueprint Border (Double Line)
  doc.setDrawColor(200, 169, 110); // Architectural Gold #c8a96e
  doc.setLineWidth(0.8);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(45, 60, 85);
  doc.setLineWidth(0.3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Corner Alignment Marks (Architectural Crosshairs)
  const crosshairSize = 4;
  const corners = [
    [8, 8],
    [pageWidth - 8, 8],
    [8, pageHeight - 8],
    [pageWidth - 8, pageHeight - 8],
  ];
  doc.setDrawColor(200, 169, 110);
  doc.setLineWidth(0.4);
  corners.forEach(([cx, cy]) => {
    doc.line(cx - crosshairSize, cy, cx + crosshairSize, cy);
    doc.line(cx, cy - crosshairSize, cx, cy + crosshairSize);
  });
}

/**
 * Generates and triggers a download of a comprehensive multi-plate Architectural Sample Blueprint PDF,
 * including ALL project photographs/drawings, detailed technical specifications, and architectural descriptions.
 */
export async function downloadSampleBlueprint(
  project: ProjectItem,
  onProgress?: (status: string) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress("Initializing architectural drawing package...");

    // Gather all distinct images from project.image and project.gallery
    const rawList = [
      project.image,
      ...(project.gallery || []),
      ...((project as any).images || []),
      ...((project as any).photos || []),
    ].filter(Boolean);

    const allImages: string[] = [];
    rawList.forEach((url) => {
      if (typeof url === "string" && url.trim() && !allImages.includes(url.trim())) {
        allImages.push(url.trim());
      }
    });

    // Fallback if no images found
    if (allImages.length === 0 && project.image) {
      allImages.push(project.image);
    }

    const totalPlates = Math.max(1, allImages.length);

    // Create Landscape A4 Document: 297mm x 210mm
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 297;
    const pageHeight = 210;

    // Pre-load all project images
    if (onProgress) onProgress(`Loading ${allImages.length} architectural drawings & photos...`);
    const loadedImages: (LoadedImageInfo | null)[] = await Promise.all(
      allImages.map((url) => getBase64ImageFromUrl(url))
    );

    // Construct full architectural description
    const fullDescription = [
      project.scope ? `Project Scope: ${project.scope}` : "",
      project.alt && project.alt !== project.title ? `Architectural Highlights: ${project.alt}` : "",
      (project as any).description ? `Project Narrative: ${(project as any).description}` : "",
      "Bespoke planning calibrated for natural cross-ventilation, daylight optimization, and structural efficiency under NBC 2016 guidelines.",
    ]
      .filter(Boolean)
      .join(" ");

    // ════════════════════════════════════════════════════════════════════════
    // ── PLATE 01: MASTER SPECIFICATION & KEY BLUEPRINT ELEVATION ──
    // ════════════════════════════════════════════════════════════════════════
    if (onProgress) onProgress(`Rendering Plate 1 of ${totalPlates} (Master Specification)...`);
    drawArchitecturalBlueprintCanvas(doc, pageWidth, pageHeight);

    // TOP BANNER: STUDIO WORDMARK & CLASSIFICATION
    doc.setFillColor(15, 23, 42);
    doc.rect(10, 10, pageWidth - 20, 14, "F");
    doc.setDrawColor(200, 169, 110);
    doc.setLineWidth(0.4);
    doc.line(10, 24, pageWidth - 10, 24);

    // Studio Name
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("MOHALKAR ARCHITECTS & PLANNERS", 15, 17);

    // Tagline / Practice Locations
    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("DESIGN ATELIER · PUNE · BHOOM · DHARASHIV · PAN-INDIA", 15, 21.5);

    // Header Right: Document Security / Classification Stamp
    doc.setFillColor(200, 169, 110);
    doc.roundedRect(pageWidth - 92, 13, 78, 7.5, 1, 1, "F");
    doc.setTextColor(11, 17, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(
      `PLATE 01 OF ${String(totalPlates).padStart(2, "0")} · MASTER SPECIFICATION SHEET`,
      pageWidth - 90,
      17.8
    );

    // ── MAIN DRAWING VIEWPORT (Left side: 178mm wide x 128mm high) ──
    const viewportX = 14;
    const viewportY = 28;
    const viewportW = 178;
    const viewportH = 126;

    doc.setFillColor(8, 12, 22);
    doc.rect(viewportX, viewportY, viewportW, viewportH, "F");
    doc.setDrawColor(35, 48, 70);
    doc.setLineWidth(0.4);
    doc.rect(viewportX, viewportY, viewportW, viewportH);

    const firstImg = loadedImages[0];
    if (firstImg) {
      try {
        const imgAspect = firstImg.width / firstImg.height;
        const vpMaxW = viewportW - 4;
        const vpMaxH = viewportH - 12; // account for bottom bar
        const vpAspect = vpMaxW / vpMaxH;

        let drawW = vpMaxW;
        let drawH = vpMaxH;
        let drawX = viewportX + 2;
        let drawY = viewportY + 2;

        if (imgAspect > vpAspect) {
          drawW = vpMaxW;
          drawH = vpMaxW / imgAspect;
          drawY = viewportY + 2 + (vpMaxH - drawH) / 2;
        } else {
          drawH = vpMaxH;
          drawW = vpMaxH * imgAspect;
          drawX = viewportX + 2 + (vpMaxW - drawW) / 2;
        }

        doc.addImage(firstImg.dataUrl, "JPEG", drawX, drawY, drawW, drawH, undefined, "FAST");
      } catch (err) {
        console.warn("Could not insert primary image into PDF:", err);
      }
    } else {
      // Fallback architectural schematic graphic
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.3);
      doc.rect(viewportX + 10, viewportY + 10, viewportW - 20, viewportH - 20);
      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("ARCHITECTURAL WORKING DRAWING", viewportX + 35, viewportY + 55);
      doc.setFontSize(9);
      doc.setTextColor(160, 175, 200);
      doc.text(project.title, viewportX + 35, viewportY + 65);
    }

    // Viewport Overlay Banner
    doc.setFillColor(11, 17, 30);
    doc.rect(viewportX, viewportY + viewportH - 10, viewportW, 10, "F");
    doc.setDrawColor(200, 169, 110);
    doc.setLineWidth(0.3);
    doc.line(viewportX, viewportY + viewportH - 10, viewportX + viewportW, viewportY + viewportH - 10);

    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(
      `PLATE REF: ${project.id.toUpperCase()}-PL01 · ${project.tag.toUpperCase()}`,
      viewportX + 4,
      viewportY + viewportH - 3.8
    );

    doc.setTextColor(200, 210, 225);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(
      `SCALE: ${project.scale || "1:100 @ A3"} | NORTH ORIENTED`,
      viewportX + viewportW - 58,
      viewportY + viewportH - 3.8
    );

    // ── RIGHT SIDEBAR: TECHNICAL TITLE BLOCK & SPECS (87mm wide) ──
    const sbX = 196;
    const sbY = 28;
    const sbW = 87;
    const sbH = 168;

    // Sidebar Container
    doc.setFillColor(14, 21, 37);
    doc.rect(sbX, sbY, sbW, sbH, "F");
    doc.setDrawColor(200, 169, 110);
    doc.setLineWidth(0.5);
    doc.rect(sbX, sbY, sbW, sbH);

    // Title Block Header
    doc.setFillColor(20, 30, 52);
    doc.rect(sbX, sbY, sbW, 10, "F");
    doc.setDrawColor(200, 169, 110);
    doc.setLineWidth(0.3);
    doc.line(sbX, sbY + 10, sbX + sbW, sbY + 10);

    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("PROJECT SPECIFICATION BLOCK", sbX + 4, sbY + 6.5);

    // Project Details Key-Value Matrix
    let curY = sbY + 15;
    const specFields = [
      { label: "PROJECT TITLE", value: project.title },
      { label: "TYPOLOGY & CATEGORY", value: `${project.tag} (${project.category})` },
      { label: "LOCATION", value: project.location || "Maharashtra, India" },
      { label: "SCALE / BUILT-UP", value: project.scale || "Custom Built-up" },
      { label: "PROJECT STAGE", value: project.stage || "Working Drawings (GFC Set)" },
      { label: "PRINCIPAL ARCHITECT", value: "Abhishek Mohalkar (B.Arch)" },
      { label: "STATUTORY CODES", value: "NBC 2016 · Vaastu Calibrated" },
      { label: "TOTAL DRAWING PLATES", value: `${totalPlates} Plates in this Blueprint Dossier` },
    ];

    specFields.forEach((field) => {
      doc.setTextColor(140, 155, 180);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.8);
      doc.text(field.label, sbX + 4, curY);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.2);

      const splitVal = doc.splitTextToSize(field.value, sbW - 8);
      doc.text(splitVal[0] || field.value, sbX + 4, curY + 3.8);

      doc.setDrawColor(25, 38, 62);
      doc.setLineWidth(0.2);
      doc.line(sbX + 4, curY + 5.8, sbX + sbW - 4, curY + 5.8);

      curY += 8.2;
    });

    // General Notes Section
    curY += 1.5;
    doc.setFillColor(20, 30, 52);
    doc.rect(sbX + 3, curY, sbW - 6, 5.5, "F");
    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text("GENERAL ARCHITECTURAL NOTES", sbX + 5, curY + 3.8);

    curY += 8;
    const generalNotes = [
      "1. All dimensions are in mm unless noted otherwise.",
      "2. Do not scale from drawing; follow written dims.",
      "3. RCC & structural details subject to consultant check.",
      "4. Natural ventilation & daylighting NBC compliant.",
      "5. All elevations and layouts copyright Mohalkar Studio.",
    ];

    doc.setTextColor(170, 185, 205);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    generalNotes.forEach((note) => {
      doc.text(note, sbX + 4, curY);
      curY += 3.8;
    });

    // Stamp / Seal Box at bottom of sidebar
    curY += 2;
    doc.setDrawColor(200, 169, 110);
    doc.setLineWidth(0.4);
    doc.rect(sbX + 4, curY, sbW - 8, 24);

    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("STUDIO AUTHENTICATION SEAL", sbX + 15, curY + 5.5);

    doc.setTextColor(220, 230, 245);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.text("Mohalkar Architects & Planners", sbX + 18, curY + 10);
    doc.text("Principal Architect: Abhishek Mohalkar", sbX + 14, curY + 14);
    doc.setTextColor(140, 160, 190);
    doc.text("Contact: +91 91460 79235", sbX + 23, curY + 18);
    doc.text("Issued: October 2026", sbX + 28, curY + 21.5);

    // ── BOTTOM TECHNICAL FOOTER STRIP (Left 178mm wide) ──
    const footY = 158;
    doc.setFillColor(14, 21, 37);
    doc.rect(viewportX, footY, viewportW, 38, "F");
    doc.setDrawColor(35, 48, 70);
    doc.setLineWidth(0.3);
    doc.rect(viewportX, footY, viewportW, 38);

    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("ARCHITECTURAL SCOPE & PROJECT DESCRIPTION", viewportX + 4, footY + 5.5);

    doc.setTextColor(180, 195, 215);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.2);
    const splitScope = doc.splitTextToSize(fullDescription, viewportW - 8);
    // Draw up to 3 lines
    const maxScopeLines = splitScope.slice(0, 3);
    doc.text(maxScopeLines, viewportX + 4, footY + 10.5);

    // Direct Inquiry Call-To-Action Box
    doc.setFillColor(20, 32, 54);
    doc.roundedRect(viewportX + 4, footY + 22, viewportW - 8, 12, 1, 1, "F");
    doc.setDrawColor(200, 169, 110);
    doc.setLineWidth(0.25);
    doc.roundedRect(viewportX + 4, footY + 22, viewportW - 8, 12, 1, 1, "S");

    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.text("COMMISSION YOUR ARCHITECTURAL BLUEPRINTS & SITE CONSULTATION", viewportX + 8, footY + 26.5);

    doc.setTextColor(240, 245, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.2);
    doc.text(
      "WhatsApp: +91 91460 79235  |  Email: mohalkararchitectsandplanners@gmail.com  |  Pune · Dharashiv · Bhoom",
      viewportX + 8,
      footY + 31
    );

    // ════════════════════════════════════════════════════════════════════════
    // ── SUBSEQUENT PLATES: ALL ADDITIONAL PHOTOGRAPHS & DRAWINGS ──
    // ════════════════════════════════════════════════════════════════════════
    for (let i = 1; i < allImages.length; i++) {
      const plateNum = i + 1;
      if (onProgress) {
        onProgress(`Rendering Plate ${plateNum} of ${totalPlates} (Architectural Photo Set)...`);
      }

      // Add a fresh landscape A4 plate
      doc.addPage("a4", "landscape");
      drawArchitecturalBlueprintCanvas(doc, pageWidth, pageHeight);

      // Top Banner
      doc.setFillColor(15, 23, 42);
      doc.rect(10, 10, pageWidth - 20, 14, "F");
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.4);
      doc.line(10, 24, pageWidth - 10, 24);

      // Studio Name
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("MOHALKAR ARCHITECTS & PLANNERS", 15, 17);

      // Plate Title
      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(
        `PROJECT ARCHIVE: ${project.title.toUpperCase()} · ${project.tag.toUpperCase()}`,
        15,
        21.5
      );

      // Header Right: Plate Badge
      doc.setFillColor(200, 169, 110);
      doc.roundedRect(pageWidth - 92, 13, 78, 7.5, 1, 1, "F");
      doc.setTextColor(11, 17, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(
        `PLATE ${String(plateNum).padStart(2, "0")} OF ${String(totalPlates).padStart(2, "0")} · DETAIL DRAWING & PHOTO`,
        pageWidth - 90,
        17.8
      );

      // Main Large Drawing Viewport (214mm wide x 138mm high)
      const gVpX = 14;
      const gVpY = 28;
      const gVpW = 214;
      const gVpH = 138;

      doc.setFillColor(8, 12, 22);
      doc.rect(gVpX, gVpY, gVpW, gVpH, "F");
      doc.setDrawColor(35, 48, 70);
      doc.setLineWidth(0.4);
      doc.rect(gVpX, gVpY, gVpW, gVpH);

      const imgInfo = loadedImages[i];
      if (imgInfo) {
        try {
          const imgAspect = imgInfo.width / imgInfo.height;
          const vpMaxW = gVpW - 4;
          const vpMaxH = gVpH - 12; // account for bottom tag
          const vpAspect = vpMaxW / vpMaxH;

          let drawW = vpMaxW;
          let drawH = vpMaxH;
          let drawX = gVpX + 2;
          let drawY = gVpY + 2;

          if (imgAspect > vpAspect) {
            drawW = vpMaxW;
            drawH = vpMaxW / imgAspect;
            drawY = gVpY + 2 + (vpMaxH - drawH) / 2;
          } else {
            drawH = vpMaxH;
            drawW = vpMaxH * imgAspect;
            drawX = gVpX + 2 + (vpMaxW - drawW) / 2;
          }

          doc.addImage(imgInfo.dataUrl, "JPEG", drawX, drawY, drawW, drawH, undefined, "FAST");
        } catch (err) {
          console.warn(`Could not render plate ${plateNum} image:`, err);
        }
      }

      // Drawing Viewport Bottom Identifier Bar
      doc.setFillColor(11, 17, 30);
      doc.rect(gVpX, gVpY + gVpH - 10, gVpW, 10, "F");
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.3);
      doc.line(gVpX, gVpY + gVpH - 10, gVpX + gVpW, gVpY + gVpH - 10);

      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(
        `FIGURE ${i + 1}: ${project.title.toUpperCase()} · VIEW / DETAIL PLATE ${plateNum}`,
        gVpX + 4,
        gVpY + gVpH - 3.8
      );

      doc.setTextColor(200, 210, 225);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text(
        `STATUS: EXECUTED / GFC DRAWING · ATELIER ISSUE`,
        gVpX + gVpW - 68,
        gVpY + gVpH - 3.8
      );

      // Right Technical Column (51mm wide x 168mm high)
      const rColX = 232;
      const rColY = 28;
      const rColW = 51;
      const rColH = 168;

      doc.setFillColor(14, 21, 37);
      doc.rect(rColX, rColY, rColW, rColH, "F");
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.5);
      doc.rect(rColX, rColY, rColW, rColH);

      // Header
      doc.setFillColor(20, 30, 52);
      doc.rect(rColX, rColY, rColW, 9, "F");
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.3);
      doc.line(rColX, rColY + 9, rColX + rColW, rColY + 9);

      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(`DRAWING INDEX: 0${plateNum}/0${totalPlates}`, rColX + 3.5, rColY + 6);

      let rY = rColY + 15;
      const colFields = [
        { label: "PROJECT", value: project.title },
        { label: "TYPOLOGY", value: project.tag },
        { label: "LOCATION", value: project.location || "Maharashtra" },
        { label: "SCALE", value: project.scale || "Custom Built-up" },
        { label: "STAGE", value: project.stage || "Executed / Built" },
      ];

      colFields.forEach((field) => {
        doc.setTextColor(140, 155, 180);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.5);
        doc.text(field.label, rColX + 3.5, rY);

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.8);
        const splitVal = doc.splitTextToSize(field.value, rColW - 7);
        doc.text(splitVal[0] || field.value, rColX + 3.5, rY + 3.8);

        doc.setDrawColor(25, 38, 62);
        doc.setLineWidth(0.2);
        doc.line(rColX + 3.5, rY + 5.5, rColX + rColW - 3.5, rY + 5.5);

        rY += 8.5;
      });

      // Technical Highlights Box
      rY += 2;
      doc.setFillColor(20, 30, 52);
      doc.rect(rColX + 3, rY, rColW - 6, 5.5, "F");
      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.2);
      doc.text("ARCHITECTURAL HIGHLIGHTS", rColX + 4.5, rY + 3.8);

      rY += 8;
      const highlights = [
        "• High-precision spatial fenestration",
        "• Passive daylight & ventilation calibration",
        "• Premium structural finish & detailing",
        "• Statutory municipal compliance",
      ];
      doc.setTextColor(170, 185, 205);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.5);
      highlights.forEach((h) => {
        doc.text(h, rColX + 3.5, rY);
        rY += 4;
      });

      // Authentication Seal
      rY += 6;
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.35);
      doc.rect(rColX + 3.5, rY, rColW - 7, 24);

      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text("STUDIO ATELIER SEAL", rColX + 8, rY + 5.5);

      doc.setTextColor(220, 230, 245);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.8);
      doc.text("Mohalkar Architects", rColX + 11, rY + 10);
      doc.text("Abhishek Mohalkar", rColX + 12, rY + 14);
      doc.setTextColor(140, 160, 190);
      doc.text("+91 91460 79235", rColX + 14, rY + 18);
      doc.text("Pune · Bhoom · India", rColX + 11, rY + 21.5);

      // Bottom Description Strip for this plate (214mm wide x 26mm high)
      const gFootY = 170;
      doc.setFillColor(14, 21, 37);
      doc.rect(gVpX, gFootY, gVpW, 26, "F");
      doc.setDrawColor(35, 48, 70);
      doc.setLineWidth(0.3);
      doc.rect(gVpX, gFootY, gVpW, 26);

      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.2);
      doc.text(
        `ARCHITECTURAL SPECIFICATION & DESIGN NARRATIVE · VIEW ${i + 1} OF ${allImages.length}`,
        gVpX + 4,
        gFootY + 5.5
      );

      doc.setTextColor(180, 195, 215);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.2);
      const splitPlateDesc = doc.splitTextToSize(fullDescription, gVpW - 8);
      doc.text(splitPlateDesc.slice(0, 2), gVpX + 4, gFootY + 10.5);

      // Bottom hotline banner
      doc.setFillColor(20, 32, 54);
      doc.rect(gVpX + 4, gFootY + 16, gVpW - 8, 7.5, "F");
      doc.setDrawColor(200, 169, 110);
      doc.setLineWidth(0.2);
      doc.rect(gVpX + 4, gFootY + 16, gVpW - 8, 7.5);

      doc.setTextColor(200, 169, 110);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.2);
      doc.text(
        "CONSULT ON THIS DRAWING / SITE COMMISSION: WhatsApp +91 91460 79235  |  mohalkararchitectsandplanners@gmail.com",
        gVpX + 7,
        gFootY + 21
      );
    }

    // Clean sanitized filename
    const cleanTitle = project.title.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const fileName = `Mohalkar_Blueprint_Set_${project.id.toUpperCase()}_${cleanTitle}.pdf`;

    if (onProgress) onProgress("Finalizing multi-plate architectural dossier...");
    doc.save(fileName);
    return true;
  } catch (error) {
    console.error("Error generating sample blueprint PDF:", error);
    return false;
  }
}

export const generateProjectPdf = downloadSampleBlueprint;
export const downloadProjectBlueprint = downloadSampleBlueprint;
export const generateBlueprint = downloadSampleBlueprint;
export const downloadBlueprint = downloadSampleBlueprint;

export async function generateCostEstimatePdf(estimateData?: any): Promise<boolean> {
  try {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.setFillColor(11, 17, 30);
    doc.rect(0, 0, 210, 297, "F");
    doc.setTextColor(200, 169, 110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("MOHALKAR ARCHITECTS & PLANNERS", 15, 20);
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text("Architectural Project Cost Estimate Summary", 15, 28);
    doc.save("Mohalkar_Architects_Cost_Estimate.pdf");
    return true;
  } catch (e) {
    console.error("Failed to generate cost estimate PDF", e);
    return false;
  }
}
export const downloadCostEstimatePdf = generateCostEstimatePdf;

export default downloadSampleBlueprint;
