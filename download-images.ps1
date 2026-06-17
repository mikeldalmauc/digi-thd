# Script para descargar imágenes de Unsplash para todas las tarjetas de casos
$publicFolder = 'public'

# Crear mapeo de tarjetas a términos de búsqueda
$imageMap = @{
    # Gemelo Digital
    'c-1-1' = 'assembly,line,factory'
    'c-1-2' = 'surgery,operation'
    'c-1-3' = 'industrial,equipment'
    'c-1-4' = 'bridge,infrastructure'
    'c-1-5' = 'training,simulation'
    
    # Blockchain
    'c-2-1' = 'food,traceability'
    'c-2-2' = 'renewable,energy'
    'c-2-3' = 'airplane,maintenance'
    'c-2-4' = 'digital,contract'
    'c-2-5' = 'diploma,certificate'
    
    # IoT
    'c-3-1' = 'cattle,ranch'
    'c-3-2' = 'irrigation,agriculture'
    'c-3-3' = 'hospital,monitoring'
    'c-3-4' = 'sports,tracking'
    'c-3-5' = 'smart,city'
    
    # IA
    'c-4-1' = 'streaming,entertainment'
    'c-4-2' = 'medical,imaging'
    'c-4-3' = 'customer,service'
    'c-4-4' = 'quality,control'
    'c-4-5' = 'financial,analysis'
    
    # Fabricación Aditiva
    'c-5-1' = '3D,print,prosthetic'
    'c-5-2' = 'aerospace,engine'
    'c-5-3' = 'warehouse,spare'
    'c-5-4' = 'eyeglasses,frames'
    'c-5-5' = 'prototype,design'
    
    # Edge Computing
    'c-6-1' = 'drone,rescue'
    'c-6-2' = 'autonomous,vehicle'
    'c-6-3' = 'camera,inspection'
    'c-6-4' = 'farm,irrigation'
    'c-6-5' = 'robot,safety'
}

Write-Host 'Iniciando descarga de imágenes desde Unsplash...' -ForegroundColor Cyan
Write-Host "Total: $($imageMap.Count) imágenes`n" -ForegroundColor Green

$count = 0
$success = 0
$failed = 0

foreach ($id in $imageMap.Keys) {
    $count++
    $query = $imageMap[$id]
    $filename = "$id.jpg"
    $filepath = Join-Path $publicFolder $filename
    $url = "https://source.unsplash.com/1280x720/?$query"
    
    Write-Host "[$count/$($imageMap.Count)] Descargando $filename..." -ForegroundColor Cyan -NoNewline
    
    try {
        # Usar WebClient para descargar
        $client = New-Object System.Net.WebClient
        $client.DownloadFile($url, $filepath)
        Write-Host " [OK]" -ForegroundColor Green
        $success++
    }
    catch {
        Write-Host " [ERROR] $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
    
    # Pequena pausa entre descargas
    Start-Sleep -Milliseconds 200
}

Write-Host "`nDescarga completada!" -ForegroundColor Cyan
Write-Host "Exito: $success, Fallos: $failed" -ForegroundColor Yellow
