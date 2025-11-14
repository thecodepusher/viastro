import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const routesDir = path.join(process.cwd(), "app", "routes");
    const reservationDir = path.join(routesDir, "reservation");
    const routesFiles = fs.existsSync(routesDir) ? fs.readdirSync(routesDir) : [];
    const reservationFiles = fs.existsSync(reservationDir) ? fs.readdirSync(reservationDir) : [];
    res.status(200).json({
      routesFiles,
      reservationFiles,
    });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
