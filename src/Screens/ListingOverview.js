import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useLocation, Link, useParams } from 'react-router-dom'

const car = {
  "url": "https://www.carvana.com/vehicle/2004050", "vehicle_id": 2004050, "maker": "Nissan", "model": "Sentra", "price": 18990, "year": 2017, "body_style": "Sedan", "body_type": "Sedan", "sale_status": "Available", "mileage": 27633, "trim": "S Sedan 4D", "location": {"addressLine1": "14450 West Rd", "city": "Houston", "stateAbbreviation": "TX", "zip5": "77041"}, "details": {"basics": {"mpgCity": 27, "mpgHighway": 37, "engineCylinderCount": 4, "engineDescription": "4-Cyl, 1.8 Liter", "engineHorsepower": 0, "engineTorque": 0, "fuelDescription": "Gas", "driveTrainDescription": "FWD", "exteriorColor": "Silver", "interiorColor": "OTHER", "exteriorRGB": {"red": 201, "green": 192, "blue": 187}, "interiorRGB": {"red": 255, "green": 255, "blue": 255}, "transmission": "Auto, CVT w/Xtronic", "numberOfKeys": 1, "doors": 4, "seating": "5", "vin": "3N1AB7AP2HY321285", "stockNumber": 2001283529, "windowStickerUrl": "https://windowsticker.carvana.io/pose_api_3956c27a-069e-11ec-a73e-068f4997ba7d.pdf", "poseData": {"installedPackages": [], "installedOptions": [], "installedOptionsData": [], "standardEquipment": ["VALUE CARGO PACKA", "SPLASH GUARDS 4-P", "CARPETED FLOOR MA", "50 STATE EMISSION"], "windowStickerUrl": "https://windowsticker.carvana.io/pose_api_3956c27a-069e-11ec-a73e-068f4997ba7d.pdf"}, "marketplaceDealerId": 76, "curbWeight": 2857, "msrp": 18975, "kbbVehicleID": 421962, "engineDisplacement": 0}, "facets": [{"facetId": 10, "facetName": "Hands Free Calling"}, {"facetId": 25, "facetName": "Alloy Wheels"}], "KBBData": [{"label": "Braking and Traction", "feature": [{"label": "Braking and Traction", "displayName": "ABS (4-Wheel)", "isValuable": false, "isRare": false, "kbbOptionId": 7558666}, {"label": "Braking and Traction", "displayName": "Traction Control", "isValuable": false, "isRare": false, "kbbOptionId": 7558683}, {"label": "Braking and Traction", "displayName": "Vehicle Dynamic Control", "isValuable": false, "isRare": false, "kbbOptionId": 7558684}]}, {"label": "Comfort and Convenience", "feature": [{"label": "Comfort and Convenience", "displayName": "Air Conditioning", "isValuable": false, "isRare": false, "kbbOptionId": 7558667}, {"label": "Comfort and Convenience", "displayName": "Cruise Control", "isValuable": false, "isRare": false, "kbbOptionId": 7558671}, {"label": "Comfort and Convenience", "displayName": "Power Door Locks", "isValuable": false, "isRare": false, "kbbOptionId": 7558675}, {"label": "Comfort and Convenience", "displayName": "Power Trunk Release", "isValuable": false, "isRare": false, "kbbOptionId": 7558676}, {"label": "Comfort and Convenience", "displayName": "Power Windows", "isValuable": false, "isRare": false, "kbbOptionId": 7558678}]}, {"label": "Safety and Security", "feature": [{"label": "Safety and Security", "displayName": "Dual Air Bags", "isValuable": false, "isRare": false, "kbbOptionId": 7558672}, {"label": "Safety and Security", "displayName": "F&R Head Curtain Air Bags", "isValuable": false, "isRare": false, "kbbOptionId": 7558673}, {"label": "Safety and Security", "displayName": "Side Air Bags", "isValuable": false, "isRare": false, "kbbOptionId": 7558680}]}, {"label": "Steering", "feature": [{"label": "Steering", "displayName": "Power Steering", "isValuable": false, "isRare": false, "kbbOptionId": 7558677}, {"label": "Steering", "displayName": "Tilt & Telescoping Wheel", "isValuable": false, "isRare": false, "kbbOptionId": 7558682}]}, {"label": "Wheels and Tires", "feature": [{"label": "Wheels and Tires", "displayName": "Steel Wheels", "isValuable": false, "isRare": true, "kbbOptionId": 7558689}]}, {"label": "Entertainment and Instrumentation", "feature": [{"label": "Entertainment and Instrumentation", "displayName": "AM/FM Stereo", "isValuable": false, "isRare": false, "kbbOptionId": 7558694}, {"label": "Entertainment and Instrumentation", "displayName": "CD/MP3 (Single Disc)", "isValuable": false, "isRare": false, "kbbOptionId": 7558696}]}], "warranty": {"manufacturerBasicWarrantyMonths": 36, "manufacturerBasicWarrantyMiles": 36000, "manufacturerDriveTrainWarrantyMonths": 60, "manufacturerDriveTrainWarrantyMiles": 60000, "inServiceDate": "2018-02-13T00:00:00Z", "remainingWarrantyMonths": 0, "remainingWarrantyMiles": 8100, "remainingDriveTrainWarrantyMonths": 16, "remainingDriveTrainWarrantyMiles": 32100, "inServiceMiles": 60}}, "highlights": [{"tagId": 21, "tagCategoryId": 1, "tagKey": "AccidentFree", "tagName": "Accident Free", "tagDescription": "Like every Carvana vehicle, this vehicle has never been in a reported accident.", "sortOrder": 10, "isResultTileDisplayable": false, "isVdpDisplayable": true}, {"tagId": 20, "tagCategoryId": 1, "tagKey": "SingleOwner", "tagName": "Single Owner", "tagDescription": "This vehicle\u2019s CarFax history report shows it has had only one previous owner.", "sortOrder": 200, "isResultTileDisplayable": false, "isVdpDisplayable": true}], "images": ["https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569543.jpg?v=1631658156.876", null, "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569545.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569546.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569547.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569548.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569549.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569550.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569551.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569552.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569553.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569554.jpg?v=1631658156.876", null, null, "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569557.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569578.jpg?v=1631658156.876", "https://vexgateway.fastly.carvana.io/vex-571245/details/feature-9569580.jpg?v=1631658156.876"], "scraped_at": "2021-10-09 13:10:07"
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ListingOverview() {
    const location = useLocation()
    const {name} = location.state
    const params = useParams()
    const vehicle_id = params.id
    const breadcrumbs = [
        { id: 1, name: 'Marketplace', href: '/marketplace' },
    ]
  



  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <Link to={`/posting/${vehicle_id}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {name}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        {/* <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={car.images[0].src}
              alt={car.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={car.images[1].src}
                alt={car.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={car.images[2].src}
                alt={car.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={car.images[3].src}
              alt={car.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div> */}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{`${car.maker} ${car.model}`}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${car.price}</p>

            {/* Reviews 
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> 

            <form className="mt-10">
              // Colors
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                
              </div>

              //Sizes 
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup  className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {car.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup> 
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form> */}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{car.maker}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              {/* <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {car.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{car.model}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
