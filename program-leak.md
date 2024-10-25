#-------------------- leak --------------------
Chrome DevTools API - bu Chrome brauzerining ichki vositalarini dasturiy interfeys orqali boshqarish imkonini beruvchi API. Bu API yordamida siz tarmoq faoliyatini kuzatishingiz, JavaScript kodini tekshirishingiz va profiling qilishingiz mumkin.

chrome://inspect
brave://inspect

yordamida nodejs ishlatiladigan proyektlar uchun ishlatiladigan xususiyat.


# Autocannon 
Autocannon - bu Node.js uchun yuqori samarali HTTP/1.1 benchmarking vositasi. Bu vosita yordamida siz veb-sayt yoki API'ning yuk ko'tarish qobiliyatini sinab ko'rishingiz mumkin.
Autocannon'ni o'rnatish va ishlatish

npm install -g autocannon

autocannon http://localhost:3000/review/product/64d06117f1b2c72f77e5e19f
Bu buyruq 10 soniya davomida 100 ta bir vaqtning o'zida ulanish bilan http://localhost:3000/review/product/64d06117f1b2c72f77e5e19f saytini sinovdan o'tkazadi.


#------------------------ clinic.js doctor --------------------

clinic.js doctor - bu Node.js ilovalari uchun ishlatiladigan diagnostika vositasi. Bu vosita yordamida siz ilovangizning ishlashini tahlil qilishingiz va muammolarni aniqlashingiz mumkin. clinic.js doctor ilovangizning CPU, xotira va boshqa resurslardan foydalanishini kuzatadi va tahlil qiladi.

Clinic.js Doctor'ni o'rnatish:
npm install -g clinic

Clinic.js Doctor'ni ishlatish:
clinic doctor -- node app.js

Bu buyruq ilovangizni kuzatishni boshlaydi.

2. Ilovangizni sinovdan o'tkazing. Masalan, brauzer orqali ilovangizga so'rovlar yuboring yoki boshqa usullar bilan ilovangizni yuklang.

3. Kuzatish tugagandan so'ng, clinic.js doctor kuzatish natijalarini tahlil qiladi va hisobot yaratadi. Hisobotni ko'rish uchun quyidagi buyruqni ishlating:
clinic doctor --visualize [clinic-doctor-fayl]

Bu buyruq hisobotni brauzerda ochadi va siz ilovangizning ishlashini tahlil qilishingiz mumkin

Misol uchun:
clinic doctor -- node app.js

Bu buyruq app.js faylini clinic.js doctor bilan ishga tushiradi va kuzatishni boshlaydi. Kuzatish tugagandan so'ng, hisobotni ko'rish uchun quyidagi buyruqni ishlating:
clinic doctor --visualize 12345.clinic-doctor

Bu buyruq 12345.clinic-doctor faylini brauzerda ochadi va siz ilovangizning ishlashini tahlil qilishingiz mumkin.


