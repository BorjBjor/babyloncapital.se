# Babylon Capital – babyloncapital.se

Källfiler för webbplatsen [babyloncapital.se](https://babyloncapital.se/).
Webbplatsen består av statiska HTML-, CSS- och JavaScript-filer och publiceras via GitHub Pages. Ingen installation eller byggprocess behövs.

## Språk och innehåll

- Svenska: webbplatsens rot.
- Engelska: `/en/`.
- Spanska: `/es/`.

Sajten innehåller startsida, filosofi, resultat, investera, bolagspresentation, nyheter, riskinformation, integritetspolicy samt boksidor med beställning och nedladdning.

## Filstruktur

| Fil eller mapp | Innehåll |
| --- | --- |
| `index.html` | Svensk startsida |
| `en/` och `es/` | Engelska och spanska sidor |
| `css/` | Stilmallar |
| `js/` | Meny, sidfunktioner och analys med samtycke |
| `img/` | Bilder, porträtt och bokomslag |
| `media/` | Investerarbrev och bokfiler i PDF-format |
| `CNAME` | Domännamnet `babyloncapital.se` för GitHub Pages |
| `robots.txt` | Instruktioner för sökmotorer och länk till sitemap |
| `sitemap.xml` | Webbplatsens 33 sid-adresser |
| `404.html` | Felsida för adresser som saknas |

## Publicering på GitHub Pages

1. Lägg webbplatsens filer direkt i repositoryts rot, med `index.html` och `CNAME` på översta nivån.
2. Under **Settings → Pages**, välj publicering från grenen `main` och mappen `/ (root)`.
3. Använd `babyloncapital.se` som **Custom domain** och aktivera **Enforce HTTPS** när alternativet är tillgängligt.
4. Spara ändringar med **Commit changes**. Kontrollera publiceringen under **Actions** och besök sedan berörd sida.

Behåll `CNAME` vid uppladdning av nya versioner.

## Ändra innehåll

Varje sida ligger i en egen mapp med en `index.html`. Uppdatera motsvarande språkversioner när gemensamt innehåll ändras. Sidhuvud och sidfot finns på flera sidor; kontrollera därför alla berörda sidor vid ändring av navigation eller kontaktuppgifter.

Behåll filer som används i metadata även om bilden inte visas direkt på sidan. Exempelvis används vissa PNG-bilder för bokmetadata och delningsbilder.

## Sökmotorer

Huvuddomänen är `https://babyloncapital.se/`.
Canonical-länkar, språk-länkar och sitemap ska använda denna domän.

Vid tillägg eller borttagning av en sida:

1. Uppdatera `sitemap.xml`.
2. Kontrollera sidans canonical-länk och språk-länkar.
3. Kontrollera menylänkar och andra interna länkar.

Sitemap-adress: [https://babyloncapital.se/sitemap.xml](https://babyloncapital.se/sitemap.xml).

## Google Analytics

Analyskoden finns i `js/analytics.js`, `js/analytics-en.js` och `js/analytics-es.js`. Kontrollera alla tre språkversioner vid byte av mät-ID eller ändring av samtyckesfunktionen.

Att koden finns i repositoryt innebär inte i sig att datainsamlingen har verifierats i Google Analytics.

## Avgränsning

Den här versionen är avsedd för babyloncapital.se och innehåller inga BT-folket-sidor. Investerarbrevet som PDF och den externa investerarvideon behålls. Börstjänaren förekommer fortfarande i bland annat personpresentationer, X-länkar och videons externa adress.

En eventuell omdirigering från en annan domän behöver konfigureras där den domänen hanteras.

## Lokal förhandsvisning

Kör följande i webbplatsens rot om Python finns installerat:

```sh
python -m http.server 8000
```

Öppna sedan `http://localhost:8000/` i webbläsaren.

## Kontroll av denna version

Kontrollerad 30 september 2026 utifrån det uppladdade filpaketet:

- Sitemap är giltig XML och innehåller 33 unika HTTPS-adresser på babyloncapital.se.
- Alla adresser motsvarar befintliga HTML-sidor.
- Sidornas canonical-länkar matchar sitemap.
- Alla sidor med namnet `index.html` finns med i sitemap.
- `robots.txt` pekar på rätt sitemap och `CNAME` innehåller rätt domän.

Kontrollen gäller filpaketet; den bekräftar inte Googles indexeringsstatus eller den aktuella publiceringen på nätet.
