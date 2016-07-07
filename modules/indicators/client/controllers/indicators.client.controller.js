(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['$scope', '$state', 'indicatorResolve', '$window', 'Authentication', 'IndicatorsCreateService', 'ReqsTempService'];

    function IndicatorsController($scope, $state, indicator, $window, Authentication, IndicatorsCreateService, ReqsTempService)
    {
        var vm = this;
        vm.indicator = indicator;
        if(!vm.indicator.requirements)vm.indicator.requirements=[];
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.addActivity = addActivity;
        vm.removeActivity = removeActivity;
        vm.showInput = showInput;
        vm.goToInputForm = goToInputForm;
        vm.saveInput = saveInput;
        vm.addAnswerAlternative = addAnswerAlternative;
        vm.activity = {};
        vm.input = {};
        vm.Requirements = [
            {
                id: 1123,
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sequi in modi amet ducimus, ipsam rerum saepe ut eligendi. Amet ipsum nulla aliquid autem ea iusto id qui doloribus voluptatum.",
                category: "A",
                standard: "STD 101"
            },
            {
                id: 1124,
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sequi in modi amet ducimus, ipsam rerum saepe ut eligendi. Amet ipsum nulla aliquid autem ea iusto id qui doloribus voluptatum.",
                category: "B",
                standard: "STD 102"
            },
            {
                id: 1125,
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sequi in modi amet ducimus, ipsam rerum saepe ut eligendi. Amet ipsum nulla aliquid autem ea iusto id qui doloribus voluptatum.",
                category: "A",
                standard: "STD 101"
            },
            {
                id: 1126,
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sequi in modi amet ducimus, ipsam rerum saepe ut eligendi. Amet ipsum nulla aliquid autem ea iusto id qui doloribus voluptatum.",
                category: "C",
                standard: "STD 101"
            },
            {
                id: 1127,
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sequi in modi amet ducimus, ipsam rerum saepe ut eligendi. Amet ipsum nulla aliquid autem ea iusto id qui doloribus voluptatum.",
                category: "C",
                standard: "STD 102"
            }
        ];
        vm.addRequirement=addRequirement;
        vm.removeRequirement=removeRequirement;

        vm.createService = IndicatorsCreateService;
        vm.details = vm.createService.details;

        vm.listSelected;
        vm.indicator.title = "1.2.3 - Indikator Taktil";
        vm.indicator.description = "";
        vm.indicator.activities =
        [
            {
                title: "Test Act 1",
                description: "Test act 1 description.",
                inputs: [
                {
                    text: "Is it blue?",
                    type: "yesno"
                },
                {
                    text: "What is 2+2?",
                    type: "numeric"
                }]
            },
            {
                title: "Test Act 2",
                description: "Test act 2 description.",
                inputs: [
                {
                    text: "Is it green?",
                    type: "yesno"
                },
                {
                    text: "What is 3+3?",
                    type: "numeric"
                }]
            }
        ]

        vm.inputTypes =
        [
            {
                name: "yesno",
                name_no: 'Ja / Nei',
                url: "modules/indicators/client/views/inputs/yesNo.html"
            },
            {
                name: "radio",
                name_no: 'Radioknapper',
                url: "modules/indicators/client/views/inputs/radio.html"
            },
            {
                name: "checkbox",
                name_no: 'Checkbox',
                url: "modules/indicators/client/views/inputs/checkbox.html"
            },
            {
                name: "freetext",
                name_no: 'Fritekst',
                url: "modules/indicators/client/views/inputs/freetext.html"
            },
            {
                name: "numeric",
                name_no: 'Numerisk',
                url: "modules/indicators/client/views/inputs/numeric.html"
            },
            {
                name: "picture",
                name_no: 'Bilde',
                url: "modules/indicators/client/views/inputs/picture.html"
            }
        ];




        function addRequirement(req){
            if(!vm.indicator.requirements)vm.indicator.requirements = [];
            vm.indicator.requirements.push(req);
        }
        function removeRequirement(req){
            if(typeof req ==='number')
                vm.indicator.requirements.splice(req, 1);
            else
                vm.indicator.requirements.splice(vm.indicator.requirements.indexOf(req), 1);
        }
        function addAnswerAlternative()
        {
            console.log(vm.input.options.alternative)
            if (!vm.input.alternatives) vm.input.alternatives = [];
            vm.input.alternatives.push(vm.input.options.alternative);
            vm.input.options.alternative = {};
        }

        function saveInput(input)
        {
            if (!input.options.isNew)
            {
                // input.options.activity.inputs.push(input);
                console.log(input.options)
            }
            else
            {
                input.options.activity.inputs.push(input);
            }
            console.log("printing input: ")
            console.log(input)
        }

        function showInput(type)
        {
            vm.inputShow = true;
            console.log(type)
            vm.input.options.type = type;
            vm.input.type = type.name;
        }

        function editInput(input)
        {
            vm.createService.setMainView(vm.createService.views.currentView,
            {
                details: vm.createService.details
            });
            vm.createService.goToView('input-form', input,
            {
                header: "Endre registrering"
            });
            vm.input = input;
            vm.input.options = {
                activity: vm.createService.details
            };
            for (var i = 0; i < vm.inputTypes.length; i++)
            {
                if (vm.inputTypes[i].name === input.type)
                {
                    showInput(vm.inputTypes[i]);
                }
            }
        }

        function goToInputForm(activity, input, options)
        {
            if (options && options.edit && options.edit == true)
            {
                editInput(input);
            }
            else
            {
                vm.createService.setMainView(vm.createService.views.currentView,
                {
                    details: activity
                });
                vm.createService.goToView('input-form', input,
                {
                    header: "Ny registrering"
                });
                vm.input = {};
                vm.input.options = {
                    isNew: true,
                    activity: activity
                };
                showInput(vm.inputTypes[0])
            }
        }
        // Remove existing indicator
        function remove()
        {
            if ($window.confirm('Are you sure you want to delete?'))
            {
                vm.indicator.$remove($state.go('indicators.list'));
            }
        }

        function addActivity()
        {
            vm.createService.details = {
                title: "Aktivitet uten navn",
                description: "Ingen Beskrivelse",
                krav: [],
                inputs: []
            }
            vm.indicator.activities.push(vm.createService.details);
            vm.createService.goToView('form-activity', vm.createService.details)
        }

        function removeActivity(obj)
        {
            var index = vm.indicator.activities.indexOf(obj);
            vm.indicator.activities.splice(index, 1);
        }
        // Save indicator
        function save(isValid)
        {
            if (!isValid)
            {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.indicatorForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.indicator._id)
            {
                vm.indicator.$update(successCallback, errorCallback);
            }
            else
            {
                vm.indicator.$save(successCallback, errorCallback);
            }

            function successCallback(res)
            {
                $state.go('indicators.view',
                {
                    indicatorId: res._id
                });
            }

            function errorCallback(res)
            {
                vm.error = res.data.message;
            }
        }
    }
}());