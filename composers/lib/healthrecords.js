/**
 * healthrecords script
 */


/**
     * Place an order for a vehicle
     * @param {composers.healthrecords.updateMedication} updateMedication - the updateMedication transaction
     * @transaction
     */
function updateMedication(updateMedication){
  console.log('update medication');

  var id = updateMedication.patientInfo.patientID;
  return getAssetRegistry('composers.healthrecords.PatientInfo')
    .then(function(ar) {
      return ar.get(id).then(function(info){
        info.medicationArray = updateMedication.medicationArray;
        return ar.update(info);
    })
  })
}

/**
     * Place an order for a vehicle
     * @param {composers.healthrecords.updatePastVisits} updatePastVisits - the updatePastVisits transaction
     * @transaction
     */
function updatePastVisits(updatePastVisits){
  console.log('update past visits');
  var id = updatePastVisits.patientInfo.patientID;
  return getAssetRegistry('composers.healthrecords.PatientInfo')
    .then(function(ar) {
      return ar.get(id).then(function(info){
        info.pastVisitsArray.push(updatePastVisits.newVisit);
        return ar.update(info);
    })
  })
}

function updateContact(updateContact){
  console.log('update contact');
  var assetRegistry;
  var id = updateContact.patient.patientID;
  return getAssetRegistry('composers.healthrecords.PatientInfo')
    .then(function(ar) {
      assetRegistry = ar;
      return assetRegistry.get(id);
    })
    .then(function(asset) {
      asset.contactDetails = updateContact.contactDetails;
      return assetRegistry.update(asset);
    });  
}