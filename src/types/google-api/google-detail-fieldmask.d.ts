type GooDetailID = 'id' | 'name' | 'photos';
type GooDetailLocation =
  | 'addressComponents'
  | 'adrFormatAddress'
  | 'formattedAddress'
  | 'location'
  | 'plusCode'
  | 'shortFormattedAddress'
  | 'types'
  | 'viewport';
type GooDetailBasic =
  | 'accessibilityOptions'
  | 'businessStatus'
  | 'displayName'
  | 'googleMapsUri'
  | 'iconBackgroundColor'
  | 'iconMaskBaseUri'
  | 'primaryType'
  | 'primaryTypeDisplayName'
  | 'subDestinations'
  | 'utcOffsetMinutes';

type GooDetailAdvanced =
  | 'currentOpeningHours'
  | 'currentSecondaryOpeningHours'
  | 'internationalPhoneNumber'
  | 'nationalPhoneNumber'
  | 'priceLevel'
  | 'rating'
  | 'regularOpeningHours'
  | 'regularSecondaryOpeningHours'
  | 'userRatingCount'
  | 'websiteUri';

type GooDetailPreferred =
  | 'allowsDogs'
  | 'curbsidePickup'
  | 'delivery'
  | 'dineIn'
  | 'editorialSummary'
  | 'evChargeOptions'
  | 'fuelOptions'
  | 'goodForChildren'
  | 'goodForGroups'
  | 'goodForWatchingSports'
  | 'liveMusic'
  | 'menuForChildren'
  | 'parkingOptions'
  | 'paymentOptions'
  | 'outdoorSeating'
  | 'reservable'
  | 'restroom'
  | 'reviews'
  | 'servesBeer'
  | 'servesBreakfast'
  | 'servesBrunch'
  | 'servesCocktails'
  | 'servesCoffee'
  | 'servesDesserts'
  | 'servesDinner'
  | 'servesLunch'
  | 'servesVegetarianFood'
  | 'servesWine'
  | 'takeout';

type GooDetailFieldMask =
  | GooDetailID
  | GooDetailLocation
  | GooDetailBasic
  | GooDetailAdvanced
  | GooDetailPreferred
  | '*';
export { GooDetailFieldMask };
