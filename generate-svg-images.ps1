# Script para generar imágenes SVG para todas las tarjetas de casos (ES + EU)
$publicFolder = 'public'

# Crear mapeo de tarjetas a datos
$imageMap = @{
    # Gemelo Digital
    'c-1-1' = @{title='Linea de Montaje'; titleEu='Muntaia Linea'; color='#3B82F6'}
    'c-1-2' = @{title='Simulacion Quirurgica'; titleEu='Kirurgia Simulazioa'; color='#EF4444'}
    'c-1-3' = @{title='Equipos Industriales'; titleEu='Ekipo Industrialak'; color='#3B82F6'}
    'c-1-4' = @{title='Puentes'; titleEu='Zubiak'; color='#6B7280'}
    'c-1-5' = @{title='Entrenamiento'; titleEu='Entrenamendu'; color='#F59E0B'}
    
    # Blockchain
    'c-2-1' = @{title='Alimentos'; titleEu='Elikagaiak'; color='#10B981'}
    'c-2-2' = @{title='Energia Verde'; titleEu='Energia Berdea'; color='#10B981'}
    'c-2-3' = @{title='Aviacion'; titleEu='Abiazio'; color='#8B5CF6'}
    'c-2-4' = @{title='Contratos'; titleEu='Kontratua'; color='#F59E0B'}
    'c-2-5' = @{title='Titulos'; titleEu='Titulua'; color='#3B82F6'}
    
    # IoT
    'c-3-1' = @{title='Ganado'; titleEu='Behia'; color='#10B981'}
    'c-3-2' = @{title='Riego'; titleEu='Ureztatze'; color='#10B981'}
    'c-3-3' = @{title='Hospitales'; titleEu='Ospitaleak'; color='#EF4444'}
    'c-3-4' = @{title='Deportes'; titleEu='Kirola'; color='#06B6D4'}
    'c-3-5' = @{title='Ciudad Inteligente'; titleEu='Hiri Adimentsua'; color='#6B7280'}
    
    # IA
    'c-4-1' = @{title='Streaming'; titleEu='Streaming'; color='#EC4899'}
    'c-4-2' = @{title='Tumores'; titleEu='Tumoreak'; color='#EF4444'}
    'c-4-3' = @{title='Chatbots'; titleEu='Chatbots'; color='#3B82F6'}
    'c-4-4' = @{title='Control de Calidad'; titleEu='Kalitate Kontrola'; color='#3B82F6'}
    'c-4-5' = @{title='Analisis Financiero'; titleEu='Finantza Analisia'; color='#F59E0B'}
    
    # Fabricacion Aditiva
    'c-5-1' = @{title='Protesis'; titleEu='Protesia'; color='#EF4444'}
    'c-5-2' = @{title='Motor Aeronautico'; titleEu='Aeronotikako Motorra'; color='#8B5CF6'}
    'c-5-3' = @{title='Repuestos'; titleEu='Ordezko Piezak'; color='#6B7280'}
    'c-5-4' = @{title='Gafas'; titleEu='Betailu'; color='#06B6D4'}
    'c-5-5' = @{title='Prototipado'; titleEu='Prototipatzea'; color='#8B5CF6'}
    
    # Edge Computing
    'c-6-1' = @{title='Dron de Rescate'; titleEu='Erreskatatzeko Drona'; color='#EF4444'}
    'c-6-2' = @{title='Vehiculos Autonomos'; titleEu='Ibilgailu Autonomoak'; color='#8B5CF6'}
    'c-6-3' = @{title='Inspeccion'; titleEu='Inspekzioa'; color='#3B82F6'}
    'c-6-4' = @{title='Agricultura'; titleEu='Nekazaritza'; color='#10B981'}
    'c-6-5' = @{title='Robots'; titleEu='Robotak'; color='#3B82F6'}
}

Write-Host 'Generando imagenes SVG para todas las tarjetas de casos (ES + EU)...' -ForegroundColor Cyan
Write-Host "Total: $($imageMap.Count * 2) imagenes (30 ES + 30 EU)`n" -ForegroundColor Green

$count = 0
$success = 0

foreach ($id in $imageMap.Keys) {
    $data = $imageMap[$id]
    $title = $data.title
    $titleEu = $data.titleEu
    $color = $data.color
    
    # Generar SVG para Español
    $count++
    $filename = "$id.svg"
    $filepath = Join-Path $publicFolder $filename
    
    Write-Host "[$count/60] Generando $filename..." -ForegroundColor Cyan
    
    $svg = "<svg width='1280' height='720' xmlns='http://www.w3.org/2000/svg'>" + `
           "<rect width='1280' height='720' fill='$color'/>" + `
           "<circle cx='640' cy='360' r='200' fill='rgba(255,255,255,0.1)'/>" + `
           "<circle cx='200' cy='150' r='100' fill='rgba(255,255,255,0.05)'/>" + `
           "<circle cx='1100' cy='600' r='150' fill='rgba(255,255,255,0.08)'/>" + `
           "<text x='640' y='380' font-family='Arial, sans-serif' font-size='72' font-weight='bold' text-anchor='middle' fill='white' opacity='0.95'>" + `
           "$title" + `
           "</text>" + `
           "</svg>"
    
    try {
        $svg | Out-File -FilePath $filepath -Encoding UTF8
        Write-Host "  [OK]" -ForegroundColor Green
        $success++
    }
    catch {
        Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Generar SVG para Euskera
    $count++
    $filename = "$id-eu.svg"
    $filepath = Join-Path $publicFolder $filename
    
    Write-Host "[$count/60] Generando $filename..." -ForegroundColor Cyan
    
    $svg = "<svg width='1280' height='720' xmlns='http://www.w3.org/2000/svg'>" + `
           "<rect width='1280' height='720' fill='$color'/>" + `
           "<circle cx='640' cy='360' r='200' fill='rgba(255,255,255,0.1)'/>" + `
           "<circle cx='200' cy='150' r='100' fill='rgba(255,255,255,0.05)'/>" + `
           "<circle cx='1100' cy='600' r='150' fill='rgba(255,255,255,0.08)'/>" + `
           "<text x='640' y='380' font-family='Arial, sans-serif' font-size='72' font-weight='bold' text-anchor='middle' fill='white' opacity='0.95'>" + `
           "$titleEu" + `
           "</text>" + `
           "</svg>"
    
    try {
        $svg | Out-File -FilePath $filepath -Encoding UTF8
        Write-Host "  [OK]" -ForegroundColor Green
        $success++
    }
    catch {
        Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nGeneracion completada!" -ForegroundColor Cyan
Write-Host "Imagenes generadas: $success" -ForegroundColor Yellow
