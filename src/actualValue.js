function actualValue(valeur, dateDebut, tauxAmortissement) {
    const dateActuelle = new Date();
    const dateDebutObj = new Date(dateDebut);

    if (dateActuelle < dateDebutObj) {
        return 0;
    }

    const differenceDate = {
        year: dateActuelle.getFullYear() - dateDebutObj.getFullYear(),
        month: dateActuelle.getMonth() - dateDebutObj.getMonth(),
        day: dateActuelle.getDate() - dateDebutObj.getDate(),
    };

    var raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;
    const result = valeur - valeur * (raison * tauxAmortissement / 100);
    return result;
}

export default actualValue;