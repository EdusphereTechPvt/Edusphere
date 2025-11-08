import QRCode from "qrcode";
import { createCanvas, loadImage } from "canvas";

/**
 * 
 * @param {string} qrData - Encrypted or plain data for QR code
 * @param {object} textFields - Key/value pairs to render below the QR
 * @param {object} options - Optional config for scaling and style
 * @returns {Promise<Buffer>} - PNG buffer
 */
async function generateQrWithText(qrData, textFields = {}, options = {}) {

    const {
        qrSize = 400,
        padding = 25,
        fontFamily = "Sans",
        textColor = "#000",
        backgroundColor = "#fff",
        baseFontSize = 18,
        spacing = 28,
        centerWidth = 50,
        centerImg = "http://localhost:3000/Logo.png"
    } = options;

    const fieldCount = Object.keys(textFields).length;
    const totalTextHeight = fieldCount * (baseFontSize + 6);
    const canvasHeight = qrSize + padding * 2 + totalTextHeight + spacing;
    const canvasWidth = qrSize + padding * 2;

    // GeneratING QR
    const qrBuffer = await QRCode.toBuffer(qrData, { width: qrSize });
    const qrImage = await loadImage(qrBuffer);

    // Canvas setup
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(qrImage, padding, padding, qrSize, qrSize);

    if (centerImg) {
        try {
            const img = await loadImage(centerImg);
            const center = padding + (qrSize - centerWidth) / 2;
            ctx.drawImage(img, center, center, centerWidth, centerWidth);
        } catch (err) {
            console.warn("Failed to load center image:", err.message);
        }
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";

    let currentY = qrSize + padding + spacing;
    for (const [label, value] of Object.entries(textFields)) {
        if (value !== undefined && value !== null && value !== "") {
            const text = `${label}: ${value}`;
            ctx.font = `${label.toLowerCase().includes("session") ? "bold " : ""}${baseFontSize}px ${fontFamily}`;
            ctx.fillText(text, canvas.width / 2, currentY);
            currentY += baseFontSize + 6;
        }
    }

    return canvas.toBuffer("image/png");
}

export default generateQrWithText;
