function calculateValue(
  valeur,
  dateDebut,
  tauxAmortissement,
  valeurConstante,
  actualDate
) {
  const dateActuelle = actualDate ? new Date(actualDate) : new Date();
  const dateDebutObj = new Date(dateDebut);

  if (dateActuelle < dateDebutObj) {
    return 0;
  }

  const diffEnMillis = dateActuelle - dateDebutObj;
  const differenceDay = Math.floor(diffEnMillis / (1000 * 60 * 60 * 24));
  const differenceMonth =
    dateActuelle.getMonth() -
    dateDebutObj.getMonth() +
    12 * (dateActuelle.getFullYear() - dateDebutObj.getFullYear());
  const differenceYear =
    dateActuelle.getFullYear() - dateDebutObj.getFullYear();

  if (!tauxAmortissement) {
    const result = valeurConstante * differenceMonth;
    return result;
  } else {
    var raison = differenceYear + differenceMonth / 12 + differenceDay / 365;
    const result = valeur - valeur * ((raison * tauxAmortissement) / 100);
    return Math.floor(result);
  }
}

export default calculateValue;
