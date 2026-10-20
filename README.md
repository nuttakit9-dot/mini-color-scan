# Miniature Paint Scanner — รุ่นปรับปรุง v4

แอปเว็บแบบติดตั้งบนหน้าจอมือถือได้ (PWA) ใช้ได้บน iOS และ Android เมื่อเผยแพร่ผ่าน HTTPS

## ความสามารถที่มีในชุดนี้
- ค้นหาและจับคู่สีจากฐานข้อมูลที่ฝังอยู่ในแอป
- วิเคราะห์สีจากภาพและแสดงสีขวดที่ใกล้เคียง
- คลังสีส่วนตัว / ทำเครื่องหมายว่ามีสีใดอยู่แล้ว
- เพิ่มสีเองและนำเข้าสีจากข้อความรูปแบบ `ชื่อสี,#RRGGBB`
- Color Matcher: เทียบสีเป้าหมาย HEX กับรายการในฐานข้อมูลที่ติดตั้ง และจัดอันดับสีใกล้เคียง
- Painting Assistant: สร้างแผน Base / Shadow / Highlight สำหรับ Volumetric Highlight, Layering, NMM, Grimdark และ Tabletop พร้อมบันทึกสูตรในเครื่อง
- เครื่องมือช่วยคำนวณการผสมสีโดยประมาณ
- บันทึกข้อมูลส่วนตัวไว้ในเบราว์เซอร์ของอุปกรณ์
- Service worker สำหรับแคช app shell และเปิดหน้าแอปแบบออฟไลน์หลังจากเข้าใช้งานออนไลน์ครั้งแรก

## ขอบเขตฐานข้อมูลที่รวมอยู่
ฐานข้อมูลในไฟล์ `index.html` มี 3,618 รายการ ณ เวลาที่ปรับปรุงชุดนี้:

| แบรนด์ / ระบบสี | จำนวนรายการในไฟล์ |
|---|---:|
| AK Interactive | 1,117 |
| Army Painter | 465 |
| Army Painter Fanatic | 212 |
| Vallejo | 1,244 |
| Kimera Kolors | 39 |
| Warhammer Colour (เดิม Citadel Colour) | 351 |
| Ionic | 22 |
| THAITONE | 168 |

**สำคัญ:** จำนวนนี้คือรายการที่อยู่ในฐานข้อมูลของชุดแอปนี้ ไม่ใช่การรับรองว่าเป็นสีทุกรายการที่มีขายอยู่ในปัจจุบันหรือเป็นข้อมูลล่าสุดครบทุก SKU ข้อมูล HEX ส่วนใหญ่เป็นค่าประมาณจากฐานข้อมูลชุมชน ไม่ใช่ค่าที่ผู้ผลิตรับรอง และไม่ควรใช้แทนการเทียบสีกับสีจริงในขวด

## สถานะการอัปเดตข้อมูลเว็บ (สำคัญ)

เวอร์ชันนี้ **ยังไม่ได้ซิงก์หรือยืนยันข้อมูลทุก SKU แบบสดจากเว็บไซต์ผู้ผลิตทั้งหมด** รายการ 3,618 รายการด้านบนคือฐานข้อมูลที่ฝังมาในไฟล์ต้นฉบับ และยังคงอยู่เพื่อไม่ให้ฟังก์ชันเดิมเสียหาย การเพิ่มลิงก์แหล่งอ้างอิงไม่ใช่การอัปเดตข้อมูลโดยอัตโนมัติ ต้องนำเข้ารายการจากหน้าเว็บ/ไฟล์ colour chart ปัจจุบัน ตรวจรหัสซ้ำ สถานะสินค้า และสิทธิ์การใช้ซ้ำก่อนเผยแพร่

แหล่งทางการสำหรับการตรวจสอบรอบอัปเดต:
- AK Interactive: https://ak-interactive.com/product-category/paints/ และ https://ak-interactive.com/downloads/
- Vallejo: https://acrylicosvallejo.com/en/ และแค็ตตาล็อก 2026 https://acrylicosvallejo.com/wp-content/uploads/2025/10/Catalogo_2026-R02.pdf
- The Army Painter: https://thearmypainter.com/collections/warpaints-fanatic และ https://thearmypainter.com/pages/downloads
- Warhammer Colour (เดิม Citadel Colour): https://paint.warhammer.com/ — แบรนด์ประกาศเปลี่ยนชื่อในปี 2026
- THAITONE: https://www.thailibrary.in.th/wp-content/uploads/2015/10/Thaitone-Color.pdf — ตรวจสิทธิ์และเงื่อนไขก่อนนำข้อมูลไปเผยแพร่หรือใช้เชิงพาณิชย์

## ติดตั้ง / ทดสอบ
1. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ไปยัง Cloudflare Pages, Netlify หรือ GitHub Pages
2. เปิด URL ผ่าน HTTPS บนโทรศัพท์
3. iOS: เปิดด้วย Safari > Share > Add to Home Screen
4. Android: เปิดด้วย Chrome > เมนู > Install app / Add to Home screen
5. เปิดแอปออนไลน์อย่างน้อยหนึ่งครั้งก่อนใช้งานออฟไลน์ เพื่อให้ Service Worker แคชไฟล์หลัก

## อัปเดตเวอร์ชัน
หากเผยแพร่ทับเวอร์ชันเดิม ให้อัปโหลด `index.html`, `manifest.webmanifest`, `sw.js` และไฟล์อื่นที่เปลี่ยนแปลง จากนั้นเปลี่ยนค่า `CACHE_NAME` ใน `sw.js` ทุกครั้งที่มีการปล่อยรุ่นใหม่ เพื่อให้เครื่องผู้ใช้รับไฟล์ใหม่

## แหล่งข้อมูลและใบอนุญาต
ดู `LICENSE-THIRD-PARTY.txt` และคงไฟล์ดังกล่าวไว้เมื่อแจกจ่ายแอป ข้อมูล THAITONE มีเงื่อนไขการนำกลับมาใช้ซ้ำที่ต้องตรวจสอบแยกต่างหาก หากยังไม่มีสิทธิ์ใช้ซ้ำอย่างชัดเจน ควรนำรายการดังกล่าวออกก่อนเผยแพร่เชิงพาณิชย์หรือเผยแพร่สาธารณะในวงกว้าง

ชื่อแบรนด์และชื่อสีเป็นเครื่องหมายการค้าของเจ้าของที่เกี่ยวข้อง แอปนี้ไม่เกี่ยวข้องหรือได้รับการรับรองจากแบรนด์เหล่านั้น

## ข้อจำกัดที่ทราบ
- ค่าสี HEX บนหน้าจอเป็นค่าประมาณ แสง หน้าจอ และความเงาของสีจริงทำให้สีดูต่างกันได้
- การจับคู่สีด้วยระยะห่างสีเป็นเพียงคำแนะนำ ไม่ได้ยืนยันว่าพิกเมนต์หรือความโปร่งแสงเหมือนกัน
- ข้อมูลผู้ใช้ถูกเก็บใน local storage ของเบราว์เซอร์เครื่องนั้น ไม่ได้ซิงก์ข้ามอุปกรณ์
- แท็บแนะนำสีที่ต้องใช้ AI ถูกปิดไว้ในชุดนี้ และไม่จำเป็นต่อฟังก์ชันหลัก


## v4.2 QA fixes

- Restored the canonical internal brand key `Citadel`; the UI label is `Warhammer Colour (Citadel)`. This prevents matching, brand filters, and legacy saved ownership from breaking because of a display-name change.
- Updated the service worker cache version to `miniature-paint-scanner-v4-2`.
- Kept the existing color database intact; this release does not claim a full official catalog refresh.
