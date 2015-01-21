'use strict';

/**
*  Module [inputTimerAngular]
*
* Modulo principal do componente
*/
angular.module( 'inputTimerAngular' )
  .directive('inputTimer', inputTimer);


  /**
   * Componente para manipular hora e data de maneira ilimitada, sem ter conflito com horario de 24 ou 12 horas
   * @return {[type]} [description]
   * @ngInject
   */
  function inputTimer () {

    return{

      restrict: 'E',
      replace: true,
      scope: {
        style: '@'
      },
      require: '?ngModel',
      template: [

        '<input id="teste" type="text" class="{{ style }}" ng-model="timer" />'

      ].join( '' ),
      link: function ( $scope, $element, $attrs ) {

          //default
          if( $scope.timer === undefined || $scope.timer === '' )
            $scope.timer = '00:00';

          var oldVal, newVal;

          $element.on( "keydown", function ( value ) {

            oldVal = $element[0].value;

          });

          $element.on( 'keyup', function (  ) {

            newVal = $scope.timer;

            if( newVal === oldVal || $scope.timer === oldVal ) return;

            if( newVal === '' ){

              $scope.$apply( function () {

                $scope.timer = '00:00';

              });

              return;

            }

            if( newVal ){

              if( newVal.split(':').length > 1 ){

                var valorNovo1, valorNovo2, valorAntigo1, valorAntigo2, valorAtualizado;

                valorNovo1 = newVal.split( ':' )[0];
                valorNovo2 = newVal.split( ':' )[1];
                valorAntigo1 = oldVal.split( ':' )[0];
                valorAntigo2 = oldVal.split( ':' )[1];

                if( valorNovo1 !== valorAntigo1 ){

                  if( valorAntigo1 === '00' ){

                    valorAtualizado = valorNovo1.substring( 0, valorNovo1.length - 2 );

                  }
                  else{

                    valorAtualizado = valorNovo1;

                  }

                }
                else{

                  valorAtualizado = valorAntigo1;

                }

                valorAtualizado = valorAtualizado + ':';

                if ( valorNovo2 !== valorAntigo2 ){

                  if( valorAntigo2 === '00' ){

                    var temp = valorNovo2.substring( 0, valorNovo2.length - 2 );

                    if( valorAntigo2.length === 2 ){

                      var temp = valorNovo2.substring( 0,1 );
                      temp = temp + valorNovo2.substring( valorNovo2.length-1,valorNovo2.length );
                      valorAtualizado = valorAtualizado + temp;

                    }
                    else if( valorAntigo2.length == 1 ){

                      valorAtualizado = valorAtualizado + temp.substring( 0,2 );

                    }
                    else if ( valorAntigo2.length === 0 ){

                      valorAtualizado = valorAtualizado + '00';

                    }
                    else{

                      valorAtualizado = valorAtualizado + temp.substring( 0,2 );

                    }

                  }
                  else{

                    var temp = valorNovo2.substring( 0, valorNovo2.length - 2 );

                    if( valorAntigo2.length === 2 ){

                      var temp = valorNovo2.substring( 0,1 );
                      var temp2 = valorAntigo2.substring( 1,2 );
                      var temp3 = valorNovo2.substring( 1,2 );

                      if( temp2 !== temp3 ){

                        temp = temp + valorNovo2.substring( valorNovo2.length-2,valorNovo2.length-1 );

                      }
                      else{

                        temp = temp + valorNovo2.substring( valorNovo2.length-1,valorNovo2.length );

                      }

                      valorAtualizado = valorAtualizado + temp;

                    }
                    else if( valorAntigo2.length == 1 ){

                      valorAtualizado = valorAtualizado + valorNovo2.substring( 0,2 );

                    }
                    else if ( valorAntigo2.length === 0 ){

                      valorAtualizado = valorAtualizado + '00';

                    }
                    else{

                      valorAtualizado = valorAtualizado + valorNovo2.substring( 0,2 );

                    }

                  }

                }
                else{

                   valorAtualizado = valorAtualizado + valorAntigo2;

                }

              }
              else{

                valorAtualizado = oldVal;

              }

            }

            $scope.$apply( function () {

              $scope.timer = valorAtualizado;

            });

          });

      }

    }

  }