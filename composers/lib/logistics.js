function addAppointment(addAppointment){
	console.log('addAppointment');

	var NS_D = 'composers.logistics'

	var assetRegistry;
	var id = addAppointment.appointment.appointmentID;
	return getAssetRegistry(NS_D + '.Appointment')
		.then(function(ar){
			assetRegistry = ar;
			return assetRegistry.get(id);
		})
		.then(function(asset){
			asset.time = addAppointment.time;
			asset.realTime = addAppointment.realTime;
			return assetRegistry.update(asset);
		})
}


function onChangeAssetValue(changeAssetValue) {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    return getAssetRegistry('org.acme.biznet.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = changeAssetValue.newValue;
            return assetRegistry.update(asset);
        });
}

function updateOrderStatus(updateOrderStatus) {
    console.log('updateOrderStatus');

    var factory = getFactory();
    var NS_M = 'org.acme.vehicle.lifecycle.manufacturer';
    var NS = 'org.acme.vehicle.lifecycle';
    var NS_D = 'org.vda';

    // save the new status of the order
    updateOrderStatus.order.orderStatus = updateOrderStatus.orderStatus;

  	// get vehicle registry
  	return getAssetRegistry(NS_D + '.Vehicle')
  		.then(function(registry) {
      		if (updateOrderStatus.orderStatus === 'VIN_ASSIGNED') {
            	var vehicle = factory.newResource(NS_D, 'Vehicle', updateOrderStatus.vin );
                vehicle.vehicleDetails = updateOrderStatus.order.vehicleDetails;
                vehicle.vehicleDetails.vin = updateOrderStatus.vin;
                vehicle.vehicleStatus = 'OFF_THE_ROAD';
                return registry.add(vehicle);
            } else if(updateOrderStatus.orderStatus === 'OWNER_ASSIGNED') {
                if (!updateOrderStatus.order.orderer.vehicles) {
                    updateOrderStatus.order.orderer.vehicles = [];
                }

            	return registry.get(updateOrderStatus.vin)
                    .then(function(vehicle) {
                        vehicle.vehicleStatus = 'ACTIVE';
                        vehicle.owner = factory.newRelationship('org.acme.vehicle.lifecycle', 'PrivateOwner', updateOrderStatus.order.orderer.email);
                        vehicle.numberPlate = updateOrderStatus.numberPlate || '';
                        vehicle.vehicleDetails.numberPlate = updateOrderStatus.numberPlate || '';
                        vehicle.vehicleDetails.v5c = updateOrderStatus.v5c || '';
                        if (!vehicle.logEntries) {
                            vehicle.logEntries = [];
                        }
                        var logEntry = factory.newConcept(NS_D, 'VehicleTransferLogEntry');
                        logEntry.vehicle = factory.newRelationship(NS_D, 'Vehicle', updateOrderStatus.vin);
                        logEntry.buyer = factory.newRelationship(NS, 'PrivateOwner', updateOrderStatus.order.orderer.email);
                        logEntry.timestamp = updateOrderStatus.timestamp;
                        vehicle.logEntries.push(logEntry);
                        return registry.update(vehicle);
                    });
            }
    	})
  		.then(function() {
      		// get order registry
    		return getAssetRegistry(updateOrderStatus.order.getFullyQualifiedType());
    	})
  		.then(function(registry) {
      		// update order status
            updateOrderStatus.order.vehicleDetails.vin = updateOrderStatus.vin || '';
            
            if (!updateOrderStatus.order.statusUpdates) {
                updateOrderStatus.order.statusUpdates = [];
            }

            updateOrderStatus.order.statusUpdates.push(updateOrderStatus);

      		return registry.update(updateOrderStatus.order);
    	})
        .then(function(){
    		var updateOrderStatusEvent = factory.newEvent(NS_M, 'UpdateOrderStatusEvent');
      		updateOrderStatusEvent.orderStatus = updateOrderStatus.order.orderStatus;
      		updateOrderStatusEvent.order = updateOrderStatus.order;
    		emit(updateOrderStatusEvent);
    	});
        
}


