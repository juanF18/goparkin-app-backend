/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route, { RouterContract } from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/adress', 'AdressesController.index')
Route.post('/adress', 'AdressesController.store')
Route.get('/adress/:id', 'AdressesController.show')
Route.put('/adress/:id', 'AdressesController.update')
Route.delete('/adress/:id', 'AdressesController.destroy')

Route.get('/document', 'DocumentsController.index')
Route.post('/document', 'DocumentsController.store')
Route.get('/document:id', 'DocumentsController.show')
Route.put('/document:id', 'DocumentsController.update')
Route.delete('/document:id', 'DocumentsController.destroy')

Route.get('/parking', 'ParkingsController.index')
Route.get('/parking-document', 'ParkingsController.parkingsDocuments')
Route.post('/parking', 'ParkingsController.store')
Route.get('/parking/:id', 'ParkingsController.show')
Route.get('/parkingOwner/:id', 'ParkingsController.showOwner')
Route.put('/parking/:id', 'ParkingsController.update')
Route.delete('/parking/:id', 'ParkingsController.destroy')

Route.get('/parking_space', 'ParkingSpacesController.index')
Route.post('/parking_space', 'ParkingSpacesController.store')
Route.get('/parking_space/:id', 'ParkingSpacesController.show')
Route.put('/parking_space/:id', 'ParkingSpacesController.update')
Route.delete('/parking_space/:id', 'ParkingSpacesController.destroy')

Route.get('/permission', 'PermissionsController.index')
Route.post('/permission', 'PermissionsController.store')
Route.get('/permission/:id', 'PermissionsController.show')
Route.put('/permission/:id', 'PermissionsController.update')
Route.delete('/permission/:id', 'PermissionsController.destroy')

Route.get('/people', 'PeopleController.index')
Route.post('/people', 'PeopleController.store')
Route.get('/people-document', 'PeopleController.showDocument')
Route.get('/people/:id', 'PeopleController.show')
Route.put('/people/:id', 'PeopleController.update')
Route.delete('/people/:id', 'PeopleController.destroy')

Route.get('/raiting', 'RaitingsController.index')
Route.get('/raitingParking/:id', 'RaitingsController.indexParking')
Route.post('/raiting', 'RaitingsController.store')
Route.get('/raiting/:id', 'RaitingsController.show')
Route.put('/raiting/:id', 'RaitingsController.update')
Route.delete('/raiting/:id', 'RaitingsController.destroy')

Route.get('/reservation', 'ReservationsController.index')
Route.post('/reservation', 'ReservationsController.store')
Route.get('/reservation/:id', 'ReservationsController.show')
Route.put('/reservation/:id', 'ReservationsController.update')
Route.delete('/reservation/:id', 'ReservationsController.destroy')

Route.get('/rol', 'RolsController.index')
Route.post('/rol', 'RolsController.store')
Route.get('/rol/:id', 'RolsController.show')
Route.put('/rol/:id', 'RolsController.update')
Route.delete('/rol/:id', 'RolsController.destroy')

Route.get('/rol_permission', 'RolPermissionsController.index')
Route.post('/rol_permission', 'RolPermissionsController.store')
Route.get('/rol_permission/:id', 'RolPermissionsController.show')
Route.put('/rol_permission/:id', 'RolPermissionsController.update')
Route.delete('/rol_permission/:id', 'RolPermissionsController.destroy')

Route.get('/vehicle', 'VehiclesController.index')
Route.post('/vehicle', 'VehiclesController.store')
Route.get('/vehicle/:id', 'VehiclesController.show')
Route.put('/vehicle/:id', 'VehiclesController.update')
Route.delete('/vehicle/:id', 'VehiclesController.destroy')

Route.post('/login', 'SecuritiesController.login')
Route.post('/forgot', 'SecuritiesController.forgotPassword')
Route.post('/reset', 'SecuritiesController.resetPassword')
Route.post('/logout', 'SecuritiesController.logout')

Route.get('/public/Documents/:file', async ({ params, response }) => {
  const { file } = params
  console.log(file)

  return response.download(`/public/Documents/${file}.pdf`)
})
