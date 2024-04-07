# Quakify
 Depremleri kendi oluşturduğum api'den çekip harita üzerinde konumunu gösteren ve istendiğinde manuel yada rastgele şekilde bir şekilde veri oluşturabilen quakify adında web sitesi yaptım 

 ![image](https://github.com/mcskny/Quakify/assets/132782511/6ecc8642-de4a-44b4-b774-0a47c456574d)

## Projede kullanılanlar
### Frontend için
  - React
### Backend için
  - PHP
API yöntemi olarak Rest-API kullanıldı. Depremleri sınıflandırıp büyüklüğüne göre haritada konumlarını listelemektedir. Ayrıca Add Data kısmından ister manuel yolla isterse Random butonuna basarak rastgele bir deprem oluşturulabilmektedir. Map API için MapTiler tercih edilmiştir

![image](https://github.com/mcskny/Quakify/assets/132782511/b26915d4-cd7d-403b-9d71-1abe71094b0d)

## Proje istenilenle karşılaştırma

| İstenilen     | Yapılan |
|:--------:| -----:|
| 50km çevresi içerisinde olan değerler aynı bölge sayılarak, anormal olan depremler harita üzerinde bir süre kalacak şekilde pinlenmelidir.     |  -   |
| 1. Script input olarak lat,lon ve şiddet versini almalı ve girilen bu değeri sisteme dahil etmelidir.      | Add Data Sayfasından manuel olarak lat,lon verileri alınıp sisteme dahil edilmektedir   |
| 2. Script durdurulana kadar rastgele olarak lat,lon ve şiddet değerleri ile sisteme veri dahil etmelidir.  | Add Data Sayfasından "Add Random Quake" butonuna tıklanarak rastgele lat,long,depth,date,time ve magnitude verileri eklenebilmektedir  |
| Sistemde Apache Flink kullanılmalıdır.  | Sistemde PHP MySQL kullanılmaktadır   |
| Arka uç Java, Go veya PHP dillerinden herhangi biri ile, tercihe göre micro service veya monolithic mimaride geliştirilmelidir. Ön yüz ise React veya Vue JS çatılarından biri ile geliştirilmelidir.   | Arka uç olarak PHP, ön uç olarak React Kullanılmıştır. Monolithic mimari tercih edilmiştir   |
| Proje docker-compose üzerinden tek bir komut ile çalışacak şekilde servis edilmeli ve nasıl çalışır hale getirileceği detaylı ve güzel bir şekilde README olarak yazılmış olmalıdır. | Docker Compose yapılmış fakat yetiştirilemediği için çalışmamaktadır   |

# Kurulum
-
