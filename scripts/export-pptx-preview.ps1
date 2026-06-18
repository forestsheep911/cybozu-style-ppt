param(
  [Parameter(Mandatory = $true)]
  [string[]]$InputPath,

  [string]$OutputRoot = "data/processed/style-analysis/previews",

  [int]$MaxSlides = 8
)

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$resolvedOutputRoot = Join-Path $repoRoot $OutputRoot
New-Item -ItemType Directory -Force -Path $resolvedOutputRoot | Out-Null

function Get-SafeName {
  param([string]$Value)
  $safe = $Value -replace '[<>:"/\\|?*\x00-\x1f]', '_'
  $safe = $safe -replace '\s+', ' '
  $safe = $safe.Trim().TrimEnd('.')
  return $safe
}

$powerPoint = New-Object -ComObject PowerPoint.Application
$powerPoint.Visible = -1

try {
  foreach ($input in $InputPath) {
    $fullInput = Resolve-Path $input
    $baseName = Get-SafeName ([IO.Path]::GetFileNameWithoutExtension($fullInput))
    $deckOutputDir = Join-Path $resolvedOutputRoot $baseName
    New-Item -ItemType Directory -Force -Path $deckOutputDir | Out-Null

    Write-Output "OPEN=$fullInput"
    $presentation = $powerPoint.Presentations.Open($fullInput, $true, $false, $false)
    try {
      $count = [Math]::Min($presentation.Slides.Count, $MaxSlides)
      Write-Output "SLIDES=$($presentation.Slides.Count) EXPORTING=$count OUT=$deckOutputDir"
      for ($i = 1; $i -le $count; $i++) {
        $outFile = Join-Path $deckOutputDir ("slide-{0:D2}.png" -f $i)
        if (Test-Path $outFile) {
          Write-Output "SKIP=$outFile"
          continue
        }
        $presentation.Slides.Item($i).Export($outFile, "PNG", 1600, 900)
        Write-Output "WRITE=$outFile"
      }
    }
    finally {
      $presentation.Close()
    }
  }
}
finally {
  $powerPoint.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($powerPoint) | Out-Null
}
