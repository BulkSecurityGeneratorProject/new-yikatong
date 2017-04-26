(function() {
    'use strict';

    angular
        .module('yikatongApp')
        .controller('CardDialogController', CardDialogController);

    CardDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Card'];

    function CardDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Card) {
        var vm = this;

        vm.card = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.card.id !== null) {
                Card.update(vm.card, onSaveSuccess, onSaveError);
            } else {
                Card.save(vm.card, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('yikatongApp:cardUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
