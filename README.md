# Quakify - Earthquake Visualization and Information App

Demoyu incelemek için: [https://quakify.mcskn.com](https://quakify.mcskn.com)
## Proje Hakkında

Quakify, son depremleri listeleyen, filtreleyen, sıralayan ve harita üzerinde gösteren bir web uygulamasıdır. React, Tailwind CSS ve Maptiler SDK kullanılarak geliştirilmiştir.

**Not:** Bu proje bir demo projesidir ve kullanılan veri gerçek olmayabilir.
![resim](https://github.com/user-attachments/assets/f2e51d61-93b4-411c-a8b7-3bb6a1ce8a80)

## Demo

Demoyu incelemek için: [quakify.mcskn.com](https://quakify.mcskn.com)

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  Projeyi klonlayın:

    ```bash
    git clone <proje_github_url>
    ```
    Proje URL'sini kendi GitHub deposu URL'nizle değiştirin.

2.  Proje dizinine gidin:

    ```bash
    cd Quakify-main/quakifyapp
    ```

3.  Bağımlılıkları yükleyin:

    ```bash
    npm install
    ```
    veya
    ```bash
    yarn install
    ```

## Ortam Değişkenleri

Proje, API anahtarları gibi hassas bilgileri yönetmek için ortam değişkenlerini kullanır. Projenin kök dizininde (`quakifyapp` klasörü) `.env` adında bir dosya oluşturun ve içine aşağıdaki değişkenleri ekleyin:

```env
REACT_APP_MAPTILER_API_KEY=Maptiler_API_Anahtarınız
REACT_APP_EMAILJS_PUBLIC_KEY=EmailJS_Public_Keyiniz
```

`Maptiler_API_Anahtarınız` ve `EmailJS_Public_Keyiniz` kısımlarını kendi gerçek anahtarlarınızla değiştirin.

**.env dosyasını asla git commit ile göndermeyin. .gitignore dosyası zaten bu dosyayı dışlayacak şekilde ayarlanmıştır.**

## Çalıştırma

Projeyi geliştirme modunda çalıştırmak için:

```bash
cd quakifyapp
npm start
```

Uygulama `http://localhost:3000` adresinde açılacaktır.

## Build (Üretim Ortamı İçin)

Projeyi üretim ortamı için build etmek üzere:

```bash
cd quakifyapp
npm run build
```

Bu komut, dağıtıma hazır dosyaları `quakifyapp/build` klasöründe oluşturacaktır.

## Dağıtım (Deployment)

Build klasöründeki (`quakifyapp/build`) dosyaları web sunucunuza yükleyin. Tek Sayfa Uygulaması (SPA) yönlendirmesinin doğru çalışması için sunucunuzun tüm yolları (dosya olarak mevcut olmayanlar dahil) `index.html` dosyasına yönlendirmesi gerekmektedir.

*   **Apache Sunucusu:** `quakifyapp/build` klasörüne otomatik olarak eklenen `.htaccess` dosyasını kullanın ve bu dosyayı sunucunuzdaki web sitesi klasörünün kök dizinine yükleyin.
*   **Nginx Sunucusu:** Sunucu yapılandırmanızda `try_files $uri $uri/ /index.html;` gibi bir kural ekleyin.
*   **Diğer Sunucular/Platformlar:** Kullandığınız barındırma hizmetinin dokümantasyonuna başvurun.

## Bilinen Sorunlar

*   Contact sayfasında mobil cihazlarda kaydırma sorunu yaşanabilmektedir. Bu sorun hala araştırılmaktadır.

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen bir Pull Request (Çekme İsteği) gönderin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
