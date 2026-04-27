$ErrorActionPreference = 'Stop'

$websiteDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputPath = Join-Path (Split-Path -Parent $websiteDir) 'Landingpage_V1_Handy.html'

$indexPath = Join-Path $websiteDir 'index.html'
$cssPath = Join-Path $websiteDir 'css\style.css'
$jsPath = Join-Path $websiteDir 'js\main.js'

function Get-DataUri {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,
    [Parameter(Mandatory = $true)]
    [string]$MimeType
  )

  $bytes = [System.IO.File]::ReadAllBytes($Path)
  $base64 = [System.Convert]::ToBase64String($bytes)
  return "data:$MimeType;base64,$base64"
}

$html = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)
$js = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

$logoWhite = Get-DataUri -Path (Join-Path $websiteDir 'assets\images\logo-white.png') -MimeType 'image/png'
$logoColor = Get-DataUri -Path (Join-Path $websiteDir 'assets\images\logo.png') -MimeType 'image/png'
$portrait = Get-DataUri -Path (Join-Path $websiteDir 'assets\images\vanessa-portrait.jpg') -MimeType 'image/jpeg'

$html = $html.Replace('<link rel="stylesheet" href="css/style.css">', "<style>`r`n$css`r`n</style>")
$html = $html.Replace('<script src="js/main.js" defer></script>', "<script>`r`n$js`r`n</script>")

$html = $html.Replace('href="assets/images/logo.png"', "href=`"$logoColor`"")
$html = $html.Replace('content="assets/images/vanessa-portrait.jpg"', "content=`"$portrait`"")
$html = $html.Replace('src="assets/images/logo-white.png"', "src=`"$logoWhite`"")
$html = $html.Replace('src="assets/images/logo.png"', "src=`"$logoColor`"")
$html = $html.Replace('src="assets/images/vanessa-portrait.jpg"', "src=`"$portrait`"")

[System.IO.File]::WriteAllText($outputPath, $html, [System.Text.Encoding]::UTF8)
Write-Output $outputPath
