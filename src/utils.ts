export function formatPoints(points: number): string {
    if (points === 1) {
        return `Zdobyłeś 1 punkt`;
    } else if (points >= 2 && points <= 4) {
        return `Zdobyłeś ${points} punkty`;
    } else {
        return `Zdobyłeś ${points} punktów`;
    }
}