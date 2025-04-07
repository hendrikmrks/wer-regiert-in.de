export default function formatNumber(number) {
    return new Intl.NumberFormat('de-DE', {
        useGrouping: true,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(number);
}