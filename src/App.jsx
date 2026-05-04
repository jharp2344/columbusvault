import { useState, useMemo, useEffect, memo, useCallback } from 'react';

// Scheduler URL: every CTA in this version drives to Jon's Zoom scheduler.
// To change globally, update this single constant.
const SCHEDULER_URL = 'https://scheduler.zoom.us/jon-harp/new-build-consultation';

// Logo: Expert Partners | eXp Realty (Marion · Columbus · Newark)
// Embedded as base64 for self-contained preview. For production, the dev should
// save the logo as /public/logo-expert-partners.png and change this to "/logo-expert-partners.png".
const LOGO_SRC = "data:image/webp;base64,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";
import { MapPin, TrendingDown, Award, X, Check, ChevronRight, Filter, Building2, Zap, ArrowRight, Phone } from 'lucide-react';

// ============================================================================
// THE VAULT: Builder & Community Database
// ----------------------------------------------------------------------------
// This is the data layer Jon (or his VA) refreshes weekly.
// Each builder = one card. Each community = filtered into the detail view.
// Last verified: April 2026. All builders confirmed active in 45mi of 43215.
// ============================================================================

// =============================================================================
// THE VAULT: Builder Database (V2 - Curated, Verified April 2026)
// -----------------------------------------------------------------------------
// Each builder card surfaces the curated profile. Communities are listed openly
// — no gating. The single CTA across the entire page is "Schedule a 15 Min Call"
// pointing to Jon's Zoom scheduler. This version is positioned as a high-intent
// pre-qualifier: anyone who books has already self-qualified and is ready for
// a serious conversation.
//
// For LEAD CAPTURE (top-of-funnel), use the Phonesites version instead.
//
// Refreshed weekly by Jon or VA.
// =============================================================================

const BUILDERS = [
  {
    id: 'mi-homes',
    name: 'M/I Homes',
    badge: 'Columbus HQ',
    builderType: 'Production · Local HQ',
    yearsInColumbus: 50,
    activeCommunities: 18,
    priceRange: '$318K – $673K',
    targetMatch: '$420K – $673K',
    stars: 4.5,
    knownFor: 'Columbus-headquartered for 50+ years. Broadest floorplan range in the metro and largest active community count. Strong design center with energy-efficient standard features. Active builds across Powell, Westerville, Sunbury, Plain City, Grove City, Reynoldsburg, Hilliard, Commercial Point, Dublin, Pataskala, Lewis Center, Galena, Marysville, and Delaware.',
    typicalIncentives: ['First-year rates as low as 2.875% (5.38% APR) on 30-yr conventional', 'Flex cash up to $30,000 on QMIs', 'Bonus design center dollars on select inventory'],
    site: 'mihomes.com',
    flagshipCommunities: ['Hyland Glen (Dublin)', 'Hyatts Meadows (Delaware)', 'Hill Farm (Hilliard)', 'Jerome Village - Applewood (Plain City)'],
    communities: [
      { name: 'Hyland Glen', area: 'Dublin', miles: 16, range: '$673K+', district: 'Dublin City', status: 'Active' },
      { name: 'Hyatts Meadows', area: 'Delaware', miles: 22, range: '$591K+', district: 'Delaware City', status: 'Active' },
      { name: 'Hill Farm', area: 'Hilliard', miles: 14, range: '$462K+', district: 'Hilliard City', status: 'Active' },
      { name: 'Jerome Village - Applewood', area: 'Plain City', miles: 18, range: '$576K+', district: 'Jonathan Alder Local', status: 'Active' },
      { name: 'The Ridge at Glacier Pointe', area: 'Plain City', miles: 18, range: '$621K+', district: 'Jonathan Alder Local', status: 'Active' },
      { name: 'Ivy Wood at Northstar', area: 'Galena', miles: 21, range: '$556K+', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Miller Farm', area: 'Galena', miles: 20, range: '$432K+', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Winterbrooke Place', area: 'Lewis Center', miles: 18, range: '$470K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Berlin Farm', area: 'Delaware', miles: 22, range: '$435K+', district: 'Delaware City', status: 'Active' },
      { name: 'Woodcrest Crossing', area: 'Powell', miles: 17, range: '$444K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Forest Ridge', area: 'Pataskala', miles: 21, range: '$465K+', district: 'Southwest Licking Local', status: 'Active' },
      { name: 'Spring Hill Farm', area: 'Reynoldsburg', miles: 14, range: '$389K+', district: 'Reynoldsburg City', status: 'Active' },
      { name: 'Pinnacle Quarry', area: 'Grove City', miles: 12, range: '$411K+', district: 'South-Western City', status: 'Active' },
      { name: 'Darby Station', area: 'Plain City', miles: 18, range: '$443K+', district: 'Jonathan Alder Local', status: 'Active' },
      { name: 'Homes at Foxfire', area: 'Commercial Point', miles: 19, range: '$378K+', district: 'Teays Valley Local', status: 'Active' },
      { name: 'Clarkshaw Crossing', area: 'Powell', miles: 17, range: '$319K+', district: 'Olentangy Local', status: 'Active' },
    ],
  },
  {
    id: 'pulte-homes',
    name: 'Pulte Homes',
    badge: 'National',
    builderType: 'Production · National',
    yearsInColumbus: 65,
    activeCommunities: 16,
    priceRange: '$386K – $650K',
    targetMatch: '$420K – $650K',
    stars: 3.9,
    knownFor: 'Heavy emphasis on personalization. Interactive design tools and broad selection menu. Pulte Mortgage in-house lender frequently bundles incentives. Active builds across Blacklick, Delaware, Dublin, Hilliard, Lewis Center, Lockbourne, Marysville, New Albany, Plain City, Powell, and Sunbury.',
    typicalIncentives: ['QMI flex cash incentives via Pulte Mortgage', 'Permanent rate buydowns through in-house lender', 'Closing cost credits on select inventory homes'],
    site: 'pulte.com',
    flagshipCommunities: ['Jefferson Manor (Blacklick)', 'Magnolia Park (Sunbury)', 'Nelson Farms (Delaware)', 'Clark Shaw Reserve (Powell)'],
    communities: [
      { name: 'Jefferson Manor', area: 'Blacklick', miles: 13, range: '$650K+', district: 'Gahanna-Jefferson', status: 'Active' },
      { name: 'Nelson Farms', area: 'Delaware', miles: 22, range: '$598K+', district: 'Delaware City', status: 'Active' },
      { name: 'Magnolia Park', area: 'Sunbury', miles: 22, range: '$554K+', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Towns on the Parkway', area: 'Dublin', miles: 16, range: '$545K+', district: 'Dublin City', status: 'Active' },
      { name: 'Clark Shaw Reserve', area: 'Powell', miles: 17, range: '$485K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Glenross', area: 'Delaware', miles: 22, range: '$485K+', district: 'Delaware City', status: 'Active' },
      { name: 'Sugar Farms', area: 'Hilliard', miles: 14, range: '$461K+', district: 'Hilliard City', status: 'Active' },
      { name: 'Pioneer Crossing', area: 'Plain City', miles: 18, range: '$460K+', district: 'Jonathan Alder Local', status: 'Active' },
      { name: 'Price Ponds', area: 'Sunbury', miles: 22, range: '$445K+', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Nottingham Trace', area: 'New Albany', miles: 14, range: '$433K+', district: 'New Albany-Plain Local', status: 'Active' },
      { name: 'Amrine Meadows', area: 'Marysville', miles: 33, range: '$423K+', district: 'Marysville Exempted Village', status: 'Active' },
      { name: 'Retreat at Sugar Farms', area: 'Hilliard', miles: 14, range: '$400K+', district: 'Hilliard City', status: 'Active' },
      { name: 'Limestone Ridge', area: 'Delaware', miles: 22, range: '$396K+', district: 'Delaware City', status: 'Active' },
      { name: 'Buckstone Bend', area: 'Lockbourne', miles: 13, range: '$386K+', district: 'Hamilton Local', status: 'Active' },
      { name: 'Arrowhead at Evans Farm', area: 'Lewis Center', miles: 18, range: 'Coming soon', district: 'Olentangy Local', status: 'Coming soon' },
    ],
  },
  {
    id: 'fischer-homes',
    name: 'Fischer Homes',
    badge: 'Regional',
    builderType: 'Production · Regional',
    yearsInColumbus: 26,
    activeCommunities: 21,
    priceRange: '$302K – $673K',
    targetMatch: '$420K – $673K',
    stars: 4.3,
    knownFor: 'Cincinnati-based regional builder, nation\'s 30th largest builder with 30,000+ homes built since 1980. Strong Columbus presence in Marysville, Pickerington, Pataskala, and Sunbury. Known for design quality, streamlined customization, and aggressive FHA-friendly QMI rate promotions.',
    typicalIncentives: ['Aggressive QMI rate buydowns', 'Closing cost credits on select homes', 'Free finished basement on Hot Deal homes'],
    site: 'fischerhomes.com',
    flagshipCommunities: ['Alton Place (Hilliard)', 'Encore Park of Powell', 'Meadowlark at Jerome Village (Plain City)', 'Stockdale Farms (Delaware)'],
    communities: [
      { name: 'Alton Place', area: 'Hilliard', miles: 14, range: '$673K+', district: 'Hilliard City', status: 'Active' },
      { name: 'Encore Park of Powell', area: 'Powell', miles: 17, range: '$621K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Ivy Wood at Northstar', area: 'Sunbury', miles: 22, range: '$541K+', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Stockdale Farms', area: 'Delaware', miles: 22, range: '$539K+', district: 'Delaware City', status: 'Active' },
      { name: 'The Reserve at Pickerington Ponds', area: 'Pickerington', miles: 14, range: '$534K+', district: 'Pickerington Local', status: 'Active' },
      { name: 'The Retreat at Graystone', area: 'Pickerington', miles: 14, range: '$507K+', district: 'Pickerington Local', status: 'Active' },
      { name: 'Meadowlark at Jerome Village', area: 'Plain City', miles: 18, range: '$474K+', district: 'Jonathan Alder Local', status: 'Active' },
      { name: 'Goldwell at Northstar', area: 'Sunbury', miles: 22, range: '$437K+', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Adena Pointe', area: 'Marysville', miles: 33, range: '$400K+', district: 'Marysville Exempted Village', status: 'Active' },
      { name: 'Linnview Crossing', area: 'Heath', miles: 38, range: '$398K+', district: 'Heath City', status: 'Active' },
      { name: 'Heron Manor', area: 'Pataskala', miles: 21, range: '$391K+', district: 'Southwest Licking Local', status: 'Active' },
      { name: 'Farmstead', area: 'Grove City', miles: 12, range: '$371K+', district: 'South-Western City', status: 'Active' },
      { name: 'Glacier Ridge', area: 'Canal Winchester', miles: 16, range: '$369K+', district: 'Canal Winchester Local', status: 'Active' },
      { name: 'Day Farm', area: 'South Bloomfield', miles: 22, range: '$339K+', district: 'Teays Valley Local', status: 'Active' },
      { name: 'Heritage Ponds', area: 'Circleville', miles: 30, range: '$335K+', district: 'Circleville City', status: 'Active' },
      { name: 'Sycamore Springs', area: 'Pickerington', miles: 14, range: '$326K+', district: 'Pickerington Local', status: 'Active' },
      { name: 'Skybrook', area: 'Marysville', miles: 33, range: '$302K+', district: 'Marysville Exempted Village', status: 'Active' },
      { name: 'Royal Acres', area: 'Etna', miles: 17, range: 'Coming soon', district: 'Southwest Licking Local', status: 'Coming soon' },
      { name: 'Greenhaven', area: 'West Jefferson', miles: 25, range: 'Coming soon', district: 'Jefferson Local', status: 'Coming soon' },
    ],
  },
  {
    id: 'rockford-homes',
    name: 'Rockford Homes',
    badge: 'Local',
    builderType: 'Production · Local',
    yearsInColumbus: 35,
    activeCommunities: 16,
    priceRange: '$340K – $700K',
    targetMatch: '$400K – $700K',
    stars: 4.4,
    knownFor: 'Columbus-based local builder with deep market knowledge. Strong reputation for quality and post-close service. Wider mix of ranch/first-floor-owner plans than the nationals.',
    typicalIncentives: ['Permanent rate buydown options', 'Up to $15K toward closing on QMIs', 'Lot premium credits'],
    site: 'rockfordhomes.com',
    flagshipCommunities: ['Willow Bend (Granville)', 'Vinton Woods (Grove City)', 'The Ravines at Pleasant Run (Pickerington)'],
    communities: [
      { name: 'The Ravines at Pleasant Run', area: 'Pickerington', miles: 14, range: '$465K – $625K', district: 'Pickerington Local', status: 'Active' },
      { name: 'Vinton Woods', area: 'Grove City', miles: 10, range: '$415K – $560K', district: 'South-Western City', status: 'Active' },
      { name: 'Big Walnut Estates', area: 'Sunbury', miles: 22, range: '$485K – $675K', district: 'Big Walnut Local', status: 'Active' },
      { name: 'Willow Bend', area: 'Granville', miles: 36, range: '$445K – $600K', district: 'Granville Exempted Village', status: 'Active' },
    ],
  },
  {
    id: 'dr-horton',
    name: 'D.R. Horton',
    badge: 'Volume Leader',
    builderType: 'Production · Volume leader',
    yearsInColumbus: 18,
    activeCommunities: 24,
    priceRange: '$300K – $525K',
    targetMatch: '$400K – $525K',
    stars: 3.8,
    knownFor: "America's largest homebuilder by volume. Focused on entry-level and first-move-up. Most affordable new construction in the metro. Active across 24 Columbus communities — broadest geographic spread of any builder. Hero discount program for military/police/fire/healthcare/educators.",
    typicalIncentives: ['Hero program: $1,000 off for military/first responders/healthcare/educators', 'Permanent rate buydowns on select QMIs', 'Smart Home tech included standard'],
    site: 'drhorton.com',
    flagshipCommunities: ['Villas at Renner Park (Hilliard)', 'Lampton Village (Columbus/Brice)', 'Longview Highlands (Pickerington)', 'Weaver Ridge (Marysville)'],
    communities: [
      { name: 'Villas at Renner Park', area: 'Hilliard', miles: 14, range: '$300K+ townhomes', district: 'Hilliard City', status: 'Active' },
      { name: 'Lampton Village', area: 'Columbus', miles: 8, range: '$385K+', district: 'Groveport Madison', status: 'Active' },
      { name: 'Woodbine Village', area: 'Dublin', miles: 16, range: '$425K+', district: 'Dublin City', status: 'Active' },
      { name: 'The Reserve at Lantern Chase', area: 'Delaware', miles: 22, range: '$430K+', district: 'Delaware City', status: 'Active' },
      { name: 'Springer Woods', area: 'Delaware', miles: 22, range: '$415K+', district: 'Delaware City', status: 'Active' },
      { name: 'The Corners at Johnnycake', area: 'Lewis Center', miles: 18, range: '$430K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Piatt Preserve East', area: 'Lewis Center', miles: 18, range: '$435K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Cheshire Woods', area: 'Lewis Center', miles: 18, range: '$420K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'The Reserve at Hidden Creek', area: 'Powell', miles: 17, range: '$445K+', district: 'Olentangy Local', status: 'Active' },
      { name: 'Weaver Ridge', area: 'Marysville', miles: 33, range: '$390K+', district: 'Marysville Exempted Village', status: 'Active' },
      { name: 'Meadows at Mill Creek', area: 'Delaware', miles: 25, range: '$385K+', district: 'Buckeye Valley Local', status: 'Active' },
      { name: 'Blues Creek', area: 'Delaware', miles: 25, range: '$395K+', district: 'Buckeye Valley Local', status: 'Active' },
      { name: 'Shannon Farms', area: 'Columbus', miles: 9, range: '$385K+', district: 'Columbus City', status: 'Active' },
      { name: 'Broadmoore Commons', area: 'Pataskala', miles: 21, range: '$395K+', district: 'Licking Heights Local', status: 'Active' },
      { name: 'Ellington Village', area: 'Pataskala', miles: 21, range: '$385K+', district: 'Southwest Licking Local', status: 'Active' },
      { name: 'Manors at Ellington Village', area: 'Pataskala', miles: 21, range: '$420K+', district: 'Southwest Licking Local', status: 'Active' },
      { name: 'Longview Highlands', area: 'Pickerington', miles: 14, range: '$405K+', district: 'Pickerington Local', status: 'Active' },
      { name: 'Preston Trails', area: 'Pickerington', miles: 14, range: '$400K+', district: 'Pickerington Local', status: 'Active' },
      { name: 'Willow Pond', area: 'Pickerington', miles: 14, range: '$395K+', district: 'Pickerington Local', status: 'Active' },
      { name: 'North Grove', area: 'Columbus', miles: 9, range: '$385K+', district: 'Columbus City', status: 'Active' },
    ],
  },
  {
    id: 'three-pillar',
    name: '3 Pillar Homes',
    badge: 'Boutique',
    builderType: 'Boutique production',
    yearsInColumbus: 13,
    activeCommunities: 6,
    priceRange: '$525K – $1.1M',
    targetMatch: '$525K – $1.1M',
    stars: 4.7,
    knownFor: 'Boutique Central Ohio builder with elevated finishes and architectural design. Premium school districts (Dublin, Olentangy). Lower volume = longer build times but higher quality control.',
    typicalIncentives: ['Free design upgrade packages (~$15K)', 'Closing cost credits', 'Less rate-buydown driven (price-floor protected)'],
    site: '3pillar.com',
    flagshipCommunities: ['Eversole Run at Jerome Village (Plain City)', 'Eversole Woods (Plain City)'],
    communities: [
      { name: 'Eversole Run at Jerome Village', area: 'Plain City', miles: 19, range: '$575K – $800K', district: 'Dublin City', status: 'Active' },
      { name: 'Eversole Woods', area: 'Plain City', miles: 19, range: '$625K – $900K', district: 'Dublin City', status: 'Active' },
      { name: 'Evans Farm Reserve', area: 'Lewis Center', miles: 18, range: '$595K – $850K', district: 'Olentangy Local', status: 'Active' },
    ],
  },
  {
    id: 'schottenstein',
    name: 'Schottenstein Homes',
    badge: 'Local Legacy',
    builderType: 'Production · Local',
    yearsInColumbus: 60,
    activeCommunities: 10,
    priceRange: '$385K – $750K',
    targetMatch: '$420K – $750K',
    stars: 4.3,
    knownFor: 'Multi-generational Columbus family-owned builder. Deep roots in Dublin, Powell, Grove City. Known for energy-efficient construction and approachable price-to-finish ratio.',
    typicalIncentives: ['Closing cost credits up to $12K', 'Free finished basement promos', 'Lot premium discounts on remaining QMIs'],
    site: 'schottensteinhomes.com',
    flagshipCommunities: ['Wedgewood (Powell)', 'Edge of Italian Village (Columbus)', 'Glenross (Delaware)'],
    communities: [
      { name: 'Glenross', area: 'Delaware', miles: 24, range: '$455K – $625K', district: 'Olentangy Local', status: 'Active' },
      { name: 'Wedgewood', area: 'Powell', miles: 17, range: '$510K – $700K', district: 'Olentangy Local', status: 'Active' },
      { name: 'Edge of Italian Village', area: 'Columbus', miles: 4, range: '$650K – $850K', district: 'Columbus City', status: 'Active' },
    ],
  },
  {
    id: 'k-hovnanian',
    name: 'K. Hovnanian Homes',
    badge: 'National',
    builderType: '55+ active adult',
    yearsInColumbus: 12,
    activeCommunities: 7,
    priceRange: '$365K – $625K',
    targetMatch: '$400K – $625K',
    stars: 4.0,
    knownFor: 'National builder with growing Columbus footprint. Frequently aggressive on rate buydowns and forward commitments. Strong fit for $400–550K bracket buyers.',
    typicalIncentives: ['Builder forward commitments (BFCs)', 'Special fixed rates in mid-5%s', 'Flex cash up to $15K'],
    site: 'khov.com',
    flagshipCommunities: ['Pinnacle Reserve (Westerville)', 'Estates at Worthington Glen'],
    communities: [
      { name: 'Pinnacle Reserve', area: 'Westerville', miles: 12, range: '$420K – $580K', district: 'Westerville City', status: 'Active' },
      { name: 'Estates at Worthington Glen', area: 'Worthington', miles: 9, range: '$525K – $625K', district: 'Worthington City', status: 'Active' },
    ],
  },
  {
    id: 'maronda',
    name: 'Maronda Homes',
    badge: 'Affordable',
    builderType: 'Production',
    yearsInColumbus: 22,
    activeCommunities: 8,
    priceRange: '$310K – $475K',
    targetMatch: '$400K – $475K',
    stars: 3.7,
    knownFor: 'Streamlined affordable builder. Larger lots than most nationals. Best fit for buyers in the $400–450K bracket who prioritize square footage over premium finishes.',
    typicalIncentives: ['Rate buydowns on remaining inventory', 'Closing cost credits', 'Free appliance packages'],
    site: 'marondahomes.com',
    flagshipCommunities: ['Sussex Place (Grove City)', 'Spangler Farms (Columbus)'],
    communities: [
      { name: 'Reserves at Slate Ridge', area: 'Canal Winchester', miles: 16, range: '$390K – $475K', district: 'Canal Winchester Local', status: 'Active' },
      { name: 'Estates at New Salem', area: 'Grove City', miles: 11, range: '$385K – $460K', district: 'South-Western City', status: 'Active' },
    ],
  },
  {
    id: 'drees',
    name: 'Drees Homes',
    badge: 'New to Columbus 2026',
    builderType: 'Premium custom',
    yearsInColumbus: 1,
    activeCommunities: 1,
    priceRange: '$800K+',
    targetMatch: '$800K+',
    stars: 4.3,
    knownFor: 'Drees just entered the Columbus market in March 2026 — their 12th metro overall. Family-owned since 1928 (Cincinnati/N. Kentucky based, 95+ years). Award-winning custom builder with strong reputations in Cleveland and Cincinnati markets. Plans for 3 communities in 2026, with first model home (Ash Lawn at Alton Place, Hilliard) opening summer 2026.',
    typicalIncentives: ['New-market launch incentives possible', 'Premium custom design center', 'Full-service custom-feel build process'],
    site: 'dreeshomes.com',
    flagshipCommunities: ['Alton Place (Hilliard) - launching Summer 2026'],
    communities: [
      { name: 'Alton Place', area: 'Hilliard', miles: 14, range: '$800K+', district: 'Hilliard City', status: 'Coming soon' },
    ],
  },
  {
    id: 'epcon',
    name: 'Epcon Communities',
    badge: '55+ Focused',
    builderType: '55+ courtyard / patio',
    yearsInColumbus: 38,
    activeCommunities: 14,
    priceRange: '$400K – $700K',
    targetMatch: '$400K – $700K',
    stars: 4.4,
    knownFor: 'Columbus-based national leader in 55+ active-adult communities. Single-story ranch floorplans with zero-step entries and low-maintenance lifestyle (HOA handles lawn/snow). Strong outer-ring presence in Marysville, Delaware, Granville. Ideal for downsizers and empty-nesters.',
    typicalIncentives: ['Closing cost credits up to $10K', 'Rate buydown programs on QMIs', 'Design center bonus dollars'],
    site: 'epconcommunities.com',
    flagshipCommunities: ['Courtyards at Kensington Place (Marysville)', 'Courtyards at Mill Run (Hilliard)', 'Courtyards at Beulah Park (Grove City)'],
    communities: [
      { name: 'Courtyards at Kensington Place', area: 'Marysville', miles: 33, range: '$425K – $575K', district: 'Marysville Exempted Village', status: 'Active' },
      { name: 'Courtyards at Mill Run', area: 'Hilliard', miles: 13, range: '$475K – $625K', district: 'Hilliard City', status: 'Active' },
      { name: 'Courtyards on Lewis Center Road', area: 'Lewis Center', miles: 18, range: '$465K – $615K', district: 'Olentangy Local', status: 'Active' },
      { name: 'Courtyards at Granville', area: 'Granville', miles: 36, range: '$445K – $600K', district: 'Granville Exempted Village', status: 'Active' },
    ],
  },
  {
    id: 'centex',
    name: 'Centex Homes',
    badge: 'Entry-Level',
    builderType: 'Entry-level production',
    yearsInColumbus: 25,
    activeCommunities: 8,
    priceRange: '$280K – $475K',
    targetMatch: '$400K – $475K',
    stars: 4.0,
    knownFor: 'Pulte\'s entry-level brand — best value-to-square-foot in the metro. Strong fit for first-time buyers and budget-conscious families. Often includes free appliance packages and aggressive incentive structures on QMIs.',
    typicalIncentives: ['Rate buydowns through Pulte Mortgage', 'Closing cost credits', 'Free appliance and blind packages'],
    site: 'centex.com',
    flagshipCommunities: ['Various Columbus-area communities — call Jon for current list'],
    communities: [],
  },
  {
    id: 'pne',
    name: 'PNE Homes',
    badge: 'Boutique Custom',
    builderType: 'Custom build-on-your-lot',
    yearsInColumbus: 4,
    activeCommunities: 5,
    priceRange: '$500K – $1.5M',
    targetMatch: '$500K – $1.5M',
    stars: 4.6,
    knownFor: 'Boutique Columbus-based custom builder (BBB A+, founded 2022). Smart-home integration standard. Specializes in unique living spaces and individualized design. Build-on-your-lot capability.',
    typicalIncentives: ['Custom design consultation included', 'Smart home tech package', 'Architecture and design under one roof'],
    site: 'pnehomes.com',
    flagshipCommunities: ['Build-on-your-lot opportunities — call Jon to discuss'],
    communities: [],
  },
  {
    id: 'pnd',
    name: 'P&D Builders',
    badge: 'Custom Local',
    builderType: 'Custom build-on-your-lot',
    yearsInColumbus: 30,
    activeCommunities: 6,
    priceRange: '$450K – $900K',
    targetMatch: '$450K – $900K',
    stars: 4.5,
    knownFor: 'Long-standing Plain City–based custom builder. Known for craftsmanship, build-on-your-lot, and strong reputation in Dublin/Plain City corridor. Smaller volume = personalized attention.',
    typicalIncentives: ['Custom design consultation', 'Land acquisition assistance', 'Energy-efficient building standards'],
    site: 'pndbuilders.com',
    flagshipCommunities: ['Plain City communities', 'Custom builds across Columbus area'],
    communities: [],
  },
  {
    id: 'parry',
    name: 'Parry Custom Homes',
    badge: 'Build on Your Lot',
    builderType: 'Custom build-on-your-lot',
    yearsInColumbus: 11,
    activeCommunities: 0,
    priceRange: '$450K – $1.2M',
    targetMatch: '$450K – $1.2M',
    stars: 4.6,
    knownFor: 'Family-owned custom builder (4 generations of construction experience). Build-on-your-lot specialist with a Dublin design center. Builds in 15+ counties around Columbus including Champaign, Clark, Delaware, Franklin, Knox, Licking, Logan, Madison, Marion, Morrow, Pickaway, Ross, and Union.',
    typicalIncentives: ['50+ customizable plans', 'Top-rated warranty service', 'In-house CAD design consultation'],
    site: 'parryhomescolumbus.com',
    flagshipCommunities: ['Dublin Design Center', 'Build-on-your-lot in 15+ counties'],
    communities: [],
  },
  {
    id: 'diyanni',
    name: 'Diyanni Custom Homes',
    badge: 'Award Winning',
    builderType: 'Luxury custom',
    yearsInColumbus: 47,
    activeCommunities: 0,
    priceRange: '$500K – $2M+',
    targetMatch: '$500K – $2M+',
    stars: 4.7,
    knownFor: '2025 Homearama Best Overall Winner and BIA Parade of Homes Best Kitchen winner. Award-winning custom builder since 1979 with 2,000+ homes built across Central Ohio. Family-owned with deep Italian-rooted craftsmanship traditions.',
    typicalIncentives: ['Land acquisition assistance', 'Complete plan customization', 'Award-winning design center'],
    site: 'diyannihomes.com',
    flagshipCommunities: ['2025 Homearama winner', 'Build-on-your-lot specialty'],
    communities: [],
  },
  {
    id: 'thrive',
    name: 'Homes by Thrive',
    badge: 'Urban Infill',
    builderType: 'Urban infill / master developer',
    yearsInColumbus: 20,
    activeCommunities: 8,
    priceRange: '$400K – $1.2M',
    targetMatch: '$400K – $1.2M',
    stars: 4.5,
    knownFor: 'Master developer of Columbus brownfield-to-vibrant-community transformations: Jeffrey Park, Grandview Crossing, Quarry Trails, Founders, Grant Park, Trace Quarter, Harrison Park. Vertically integrated — they own and manage the neighborhoods they build, prioritizing walkability and amenities.',
    typicalIncentives: ['Walkable amenity-rich communities', 'In-house property management', 'Mixed-use neighborhood lifestyle'],
    site: 'thrivecos.com',
    flagshipCommunities: ['Jeffrey Park', 'Quarry Trails', 'Grandview Crossing', 'Founders (Harrison West)'],
    communities: [
      { name: 'Jeffrey Park', area: 'Columbus', miles: 4, range: '$475K – $750K', district: 'Columbus City', status: 'Active' },
      { name: 'Quarry Trails', area: 'Upper Arlington', miles: 6, range: '$525K – $850K', district: 'Upper Arlington City', status: 'Active' },
      { name: 'Grandview Crossing', area: 'Grandview Heights', miles: 5, range: '$500K – $900K', district: 'Grandview Heights City', status: 'Active' },
      { name: 'Founders', area: 'Columbus', miles: 3, range: '$575K – $900K', district: 'Columbus City', status: 'Active' },
    ],
  },
  {
    id: 'romanelli-hughes',
    name: 'Romanelli & Hughes',
    badge: 'Luxury Custom',
    builderType: 'Luxury custom',
    yearsInColumbus: 56,
    activeCommunities: 7,
    priceRange: '$650K – $3M+',
    targetMatch: '$650K – $3M+',
    stars: 4.8,
    knownFor: "Central Ohio's premier luxury custom builder since 1970. Two-generation family company with 100+ years combined experience. Energy Star rated homes (HERS 55 or below). Builds in Dublin, Powell, Westerville, Worthington, New Albany, Delaware, and Union County.",
    typicalIncentives: ['Custom architectural design', 'Energy Star efficiency', 'Multi-award-winning craftsmanship'],
    site: 'rh-homes.com',
    flagshipCommunities: ['Terra Alta (Delaware)', 'The Cove (Westerville)', 'The Grove (Worthington/Big Walnut)', 'The Overlook at Tartan Ridge (Dublin)'],
    communities: [
      { name: 'Terra Alta', area: 'Delaware', miles: 24, range: '$650K – $900K', district: 'Delaware City', status: 'Active' },
      { name: 'The Cove', area: 'Westerville', miles: 12, range: '$700K – $1M', district: 'Westerville City', status: 'Active' },
      { name: 'The Grove', area: 'Westerville', miles: 14, range: '$750K – $1.1M', district: 'Westerville City', status: 'Active' },
      { name: 'The Overlook at Tartan Ridge', area: 'Dublin', miles: 15, range: '$850K – $1.4M', district: 'Dublin City', status: 'Active' },
    ],
  },
  {
    id: 'mulberry',
    name: 'Mulberry Design + Build',
    badge: 'Modern Boutique',
    builderType: 'Modern boutique custom',
    yearsInColumbus: 13,
    activeCommunities: 3,
    priceRange: '$550K – $1.5M',
    targetMatch: '$550K – $1.5M',
    stars: 4.3,
    knownFor: 'Boutique design-build firm specializing in modern home design and urban infill. Located in Merion Village (downtown Columbus). Single-source provider from acquisition through post-construction. Best fit for buyers wanting modern aesthetic in established Columbus neighborhoods.',
    typicalIncentives: ['Single-source design and build', '300+ tile options in design studio', 'Modern urban infill specialist'],
    site: 'mulberryohio.com',
    flagshipCommunities: ['Mulberry Estates (Columbus)', 'Custom builds in Bexley, Grandview, Upper Arlington, Westerville, Worthington'],
    communities: [],
  },
  {
    id: 'arbor',
    name: 'Arbor Homes',
    badge: 'Value Volume',
    builderType: 'Entry-level production',
    yearsInColumbus: 4,
    activeCommunities: 8,
    priceRange: '$210K – $400K',
    targetMatch: '$400K – $400K',
    stars: 4.0,
    knownFor: 'Indiana-based volume builder (Berkshire Hathaway / Clayton Properties Group owned) with rapidly growing Columbus presence. Best entry-level price points in the metro — focuses on Grove City, Delaware, Canal Winchester, Circleville, London. Best fit for first-time buyers at entry-level price points.',
    typicalIncentives: ['Rates as low as 4.99% / 5.748% APR via Silverton Mortgage', 'Aggressive QMI pricing', 'Streamlined building process'],
    site: 'yourarborhome.com',
    flagshipCommunities: ['Grove City', 'Delaware', 'Canal Winchester', 'Circleville', 'London communities'],
    communities: [],
  },
];


const AREA_OPTIONS = ['All Areas', 'Northwest (Dublin/Powell)', 'Northeast (New Albany/Westerville)', 'North (Delaware/Sunbury)', 'East (Pataskala/Pickerington)', 'South (Grove City/Canal Winchester)', 'West (Marysville/Plain City)', 'Far East (Granville/Newark)'];
const PRICE_OPTIONS = ['$400K+ (all)', '$400K – $500K', '$500K – $600K', '$600K – $700K', '$700K – $850K', '$850K – $1M', '$1M+'];
const INCENTIVE_OPTIONS = ['Any incentive', 'Permanent rate buydown', 'Closing cost credit', 'Free upgrades / design dollars', 'FHA low-rate program'];

// ============================================================================
// EMPLOYERS: Major Columbus-area employers with matched community preferences
// ----------------------------------------------------------------------------
// Each employer maps to builders/communities whose commute is sensible AND
// whose price range + school district fit the likely relocating-professional
// demographic. Matched communities are names in the BUILDERS.communities list.
// ============================================================================

const EMPLOYERS = [
  {
    id: 'intel',
    name: 'Intel',
    shortLabel: 'Intel',
    location: 'New Albany / Licking County',
    direction: 'Northeast',
    commuteBand: '15–40 min',
    context: 'Intel\'s Licking County fab campus is the largest economic development project in Ohio history. If you\'re relocating for Intel, these communities give you sensible commute distance plus top-rated school districts (Granville Exempted Village is one of the best in Central Ohio).',
    badge: '$28B investment · 3,000+ jobs',
    matchedCommunities: [
      'New Albany Country Club Communities', 'Pinnacle Reserve', 'Big Walnut Reserve', 'Seven Pines',
      'Willow Bend', 'The Overlook', 'Newark Landing',
      'Courtyards at Granville', 'Highland Lakes',
    ],
  },
  {
    id: 'anduril',
    name: 'Anduril Arsenal-1',
    shortLabel: 'Anduril',
    location: 'Groveport / Rickenbacker',
    direction: 'Southeast',
    commuteBand: '10–25 min',
    context: 'Anduril\'s Arsenal-1 hyperscale manufacturing facility at 4611 Airbase Road is the largest single job-creation project in Ohio history — 4,000+ jobs at full scale. If you\'re joining Anduril, these southeast Columbus communities put you within a 10–25 minute commute.',
    badge: '$900M facility · 4,000+ jobs',
    matchedCommunities: [
      'Lakefield Place', 'Pickerington Pointe', 'Hidden Bay',
      'The Ravines at Pleasant Run', 'Glacier Pointe', 'Reserves at Slate Ridge',
      'Estates at New Salem', 'Vinton Woods',
    ],
  },
  {
    id: 'honda',
    name: 'Honda / Honda-LG EV',
    shortLabel: 'Honda',
    location: 'Marysville / Jeffersonville',
    direction: 'Northwest',
    commuteBand: '15–40 min',
    context: 'Honda\'s Marysville plant and the Honda-LG EV battery partnership have turned Union County into one of Ohio\'s most active employer corridors. Marysville Exempted Village schools are strong, and commutes stay under 30 minutes from these communities.',
    badge: 'Anchor employer · Expanding',
    matchedCommunities: [
      'Mill Creek', 'Scottish Corners', 'Overlook at Marysville',
      'Courtyards at Kensington Place', 'Eversole Run at Jerome Village', 'Eversole Woods',
      'Liberty Grand', 'Bridgewater',
    ],
  },
  {
    id: 'osu',
    name: 'Ohio State University',
    shortLabel: 'Ohio State',
    location: 'Central Columbus / OSU campus',
    direction: 'Central',
    commuteBand: '10–25 min',
    context: 'OSU and Wexner Medical Center are the largest employer in the region. Whether you\'re faculty, medical, or admin, these inside-the-outerbelt and inner-ring communities keep your commute reasonable.',
    badge: '50,000+ employees',
    matchedCommunities: [
      'Edge of Italian Village', 'Vinton Woods', 'Park Place', 'Estates at Worthington Glen',
      'Pinnacle Reserve', 'Estates at New Salem',
    ],
  },
  {
    id: 'l-brands',
    name: 'Bath & Body Works / L Brands',
    shortLabel: 'L Brands',
    location: 'Reynoldsburg HQ',
    direction: 'East',
    commuteBand: '10–30 min',
    context: 'L Brands\' Reynoldsburg campus (formerly Limited Brands) is the anchor for the east side. These east and southeast communities give you a short, predictable commute.',
    badge: 'Fortune 500 · East side HQ',
    matchedCommunities: [
      'Hidden Bay',
      'The Ravines at Pleasant Run', 'Lakefield Place', 'Pickerington Pointe',
      'Glacier Pointe', 'Willow Bend',
    ],
  },
  {
    id: 'cardinal',
    name: 'Cardinal Health',
    shortLabel: 'Cardinal Health',
    location: 'Dublin HQ',
    direction: 'Northwest',
    commuteBand: '5–25 min',
    context: 'Cardinal Health\'s Dublin headquarters anchors the entire NW employment corridor. These Dublin, Powell, and Plain City communities put you minutes from the campus with premium school districts.',
    badge: 'Fortune 20 · Dublin HQ',
    matchedCommunities: [
      'Estates at Tartan Fields', 'Tartan West', 'Eversole Run at Jerome Village',
      'Eversole Woods', 'Park Place', 'Bridgewater', 'Liberty Grand', 'Highpointe',
      'Courtyards at Mill Run',
    ],
  },
  {
    id: 'chase',
    name: 'JPMorgan Chase',
    shortLabel: 'Chase',
    location: 'Polaris + downtown',
    direction: 'North / Central',
    commuteBand: '10–30 min',
    context: 'Chase\'s two major campuses — Polaris (north side) and downtown — span the heart of the metro. These north, northeast, and inner-ring communities serve both sites well.',
    badge: 'Top 3 Columbus employer',
    matchedCommunities: [
      'Pinnacle Reserve', 'Highland Lakes', 'Bridgewater', 'Liberty Grand',
      'Estates at Worthington Glen', 'Big Walnut Reserve', 'Seven Pines',
      'New Albany Country Club Communities', 'Wedgewood',
    ],
  },
  {
    id: 'nationwide',
    name: 'Nationwide Insurance',
    shortLabel: 'Nationwide',
    location: 'Downtown Columbus',
    direction: 'Central',
    commuteBand: '10–25 min',
    context: 'Nationwide\'s downtown Columbus HQ anchors the central business district. These inner-ring and close-suburb communities balance short commutes with good school districts.',
    badge: 'Fortune 100 · Downtown HQ',
    matchedCommunities: [
      'Edge of Italian Village', 'Vinton Woods', 'Park Place',
      'Estates at Worthington Glen', 'Pinnacle Reserve', 'Courtyards on Lewis Center Road',
    ],
  },
];

// ============================================================================

export default function NewConstructionVault() {
  // Read ?employer=intel etc from URL on mount so ad landing pages auto-filter
  const getInitialEmployer = () => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const empId = params.get('employer');
    return empId ? EMPLOYERS.find((e) => e.id === empId) || null : null;
  };

  const [filterArea, setFilterArea] = useState('All Areas');
  const [filterPrice, setFilterPrice] = useState('$400K+ (all)');
  const [filterIncentive, setFilterIncentive] = useState('Any incentive');
  const [selectedEmployer, setSelectedEmployer] = useState(getInitialEmployer);
  const [selectedBuilder, setSelectedBuilder] = useState(null);

  // === ENGAGEMENT TRACKING ===
  // No opt-in form on this version — every CTA goes to the scheduler.
  // We still track visits and builder-card clicks so the high-intent popup
  // can fire after sustained engagement (3+ clicks or 3+ visits).
  const [communityClicks, setCommunityClicks] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [showHighIntentPopup, setShowHighIntentPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  // On mount: increment visit counter, check whether popup was already shown this visit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const prevVisits = parseInt(localStorage.getItem('vault_visit_count') || '0', 10);
      const newVisits = prevVisits + 1;
      localStorage.setItem('vault_visit_count', String(newVisits));
      setVisitCount(newVisits);

      const lastPopupVisit = parseInt(localStorage.getItem('vault_popup_last_visit') || '0', 10);
      if (lastPopupVisit < newVisits) {
        setPopupShown(false);
      } else {
        setPopupShown(true);
      }
    } catch {
      /* localStorage may be blocked - fail silently */
    }
  }, []);

  // High-intent trigger: 3+ community clicks OR 3+ visits → show popup once per visit
  useEffect(() => {
    if (popupShown) return;
    const trigger = communityClicks >= 3 || visitCount >= 3;
    if (trigger && !showHighIntentPopup) {
      const t = setTimeout(() => {
        setShowHighIntentPopup(true);
        setPopupShown(true);
        try {
          localStorage.setItem('vault_popup_last_visit', String(visitCount));
        } catch { /* noop */ }
      }, 800);
      return () => clearTimeout(t);
    }
  }, [communityClicks, visitCount, popupShown, showHighIntentPopup]);
  // === END ENGAGEMENT TRACKING ===

  const totalCommunities = BUILDERS.reduce((acc, b) => acc + b.communities.length, 0);

  // Parse a price range string like "$385K – $475K" or "$575K – $1.1M" → [lowK, highK] in thousands
  const parsePriceRange = (rangeStr) => {
    const parseVal = (s) => {
      if (!s) return 0;
      const num = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
      if (s.includes('M')) return num * 1000;
      return num;
    };
    const parts = rangeStr.replace(/\$/g, '').split('–').map((s) => s.trim());
    const low = parseVal(parts[0]);
    const high = parts[1] ? parseVal(parts[1]) : low;
    return [low, high];
  };

  // Filter bracket definitions → [lowK, highK]
  const BRACKETS = {
    '$400K – $500K': [400, 500],
    '$500K – $600K': [500, 600],
    '$600K – $700K': [600, 700],
    '$700K – $850K': [700, 850],
    '$850K – $1M': [850, 1000],
    '$1M+': [1000, 99999],
  };

  const filteredBuilders = useMemo(() => {
    return BUILDERS.filter((b) => {
      // Price filter check — keeps builders whose range overlaps the selected bracket
      if (filterPrice !== '$400K+ (all)' && BRACKETS[filterPrice]) {
        const [bLow, bHigh] = BRACKETS[filterPrice];
        const hasMatch = b.communities.some((c) => {
          const [cLow, cHigh] = parsePriceRange(c.range);
          return cLow <= bHigh && cHigh >= bLow;
        });
        if (!hasMatch) return false;
      }
      // Incentive filter
      if (filterIncentive !== 'Any incentive') {
        const incentiveText = b.typicalIncentives.join(' ').toLowerCase();
        if (filterIncentive === 'Permanent rate buydown' && !incentiveText.includes('permanent rate')) return false;
        if (filterIncentive === 'Closing cost credit' && !incentiveText.includes('closing cost')) return false;
        if (filterIncentive === 'Free upgrades / design dollars' && !incentiveText.includes('upgrade') && !incentiveText.includes('design') && !incentiveText.includes('finished basement')) return false;
        if (filterIncentive === 'FHA low-rate program' && !incentiveText.includes('fha')) return false;
      }
      // Area filter
      if (filterArea !== 'All Areas') {
        const areaMap = {
          'Northwest (Dublin/Powell)': ['Dublin', 'Powell', 'Plain City', 'Hilliard'],
          'Northeast (New Albany/Westerville)': ['New Albany', 'Westerville', 'Worthington'],
          'North (Delaware/Sunbury)': ['Delaware', 'Sunbury', 'Lewis Center'],
          'East (Pataskala/Pickerington)': ['Pataskala', 'Pickerington', 'Blacklick'],
          'South (Grove City/Canal Winchester)': ['Grove City', 'Canal Winchester', 'Groveport', 'Columbus'],
          'West (Marysville/Plain City)': ['Marysville', 'Plain City'],
          'Far East (Granville/Newark)': ['Granville', 'Newark'],
        };
        const areas = areaMap[filterArea] || [];
        const hasMatch = b.communities.some((c) => areas.includes(c.area));
        if (!hasMatch) return false;
      }
      // Employer filter — only show builders with at least one matched community
      if (selectedEmployer) {
        const matched = selectedEmployer.matchedCommunities || [];
        const hasMatch = b.communities.some((c) => matched.includes(c.name));
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [filterArea, filterPrice, filterIncentive, selectedEmployer]);

  // Stable click handler — keeps memoized BuilderCards from re-rendering when filters change
  const handleBuilderClick = useCallback((builder) => {
    setCommunityClicks((c) => c + 1);
    setSelectedBuilder(builder);
  }, []);


  return (
    <div className="min-h-screen text-white" style={{ background: '#0A0A0B', fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        .gold-gradient { background: linear-gradient(135deg, #D4AF37 0%, #F4CF67 50%, #B8941F 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .grain { position: relative; }
        .card-shine { position: relative; }
        @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); } 50% { box-shadow: 0 0 0 8px rgba(212,175,55,0); } }
        .pulse-gold { animation: pulse-gold 2s infinite; }
        @keyframes fade-up { from { opacity: 0; transform: translate3d(0,12px,0); } to { opacity: 1; transform: translate3d(0,0,0); } }
        .fade-up { animation: fade-up 0.35s ease-out forwards; will-change: opacity, transform; }
        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none; opacity: 1; }
          .pulse-gold { animation: none; }
        }
      `}</style>

      {/* Top bar */}
      <div className="border-b" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center" aria-label="Expert Partners | eXp Realty">
            <img src={LOGO_SRC} alt="Expert Partners · eXp Realty · Marion · Columbus · Newark" className="h-11 sm:h-12 w-auto" />
          </a>
          <a href="https://scheduler.zoom.us/jon-harp/new-build-consultation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:gold transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule a 15-min call</span>
            <span className="sm:hidden">Book a call</span>
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative grain max-w-7xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-widest mb-8" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', letterSpacing: '0.18em' }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-gold bg-gold" /> Updated weekly · April 2026
          </div>
          <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] mb-6 fade-up" style={{ fontWeight: 400 }}>
            The Columbus<br />
            <span className="italic gold-gradient">New Construction</span><br />
            Vault.
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-8 fade-up" style={{ color: 'rgba(255,255,255,0.75)', animationDelay: '0.1s' }}>
            Every active builder. Every community within 45 miles of downtown Columbus — including Marysville, Granville, and the outer growth ring. Current incentives, school districts, and price ranges <span className="gold font-semibold">starting at $400K</span>. Built and refreshed by a 15-year Columbus new-construction specialist.
          </p>
          <div className="flex flex-wrap gap-3 fade-up" style={{ animationDelay: '0.2s' }}>
            <a href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-6 py-3.5 rounded-sm font-semibold text-sm transition-all hover:translate-x-0.5" style={{ background: '#D4AF37', color: '#0A0A0B' }}>
              <Phone className="w-4 h-4" />
              Schedule a 15 Min Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#vault" className="flex items-center gap-2 px-6 py-3.5 rounded-sm font-semibold text-sm border transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Browse the vault first
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-20 border-y" style={{ borderColor: 'rgba(212,175,55,0.15)', background: 'rgba(212,175,55,0.15)' }}>
          {[
            { value: BUILDERS.length, label: 'Active Builders' },
            { value: totalCommunities, label: 'Live Communities' },
            { value: '45mi', label: 'Radius of 43215' },
            { value: '$400K+', label: 'Starting Range' },
          ].map((stat, i) => (
            <div key={i} className="px-6 py-8" style={{ background: '#0A0A0B' }}>
              <div className="font-display text-4xl sm:text-5xl gold mb-2" style={{ fontWeight: 500 }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Employer selector */}
      <section id="employers" className="max-w-7xl mx-auto px-6 pt-16 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-4 h-4 gold" />
          <span className="text-xs uppercase tracking-widest" style={{ letterSpacing: '0.18em', color: '#D4AF37' }}>Relocating to Columbus?</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl mb-3 leading-tight" style={{ fontWeight: 400 }}>
          Pick your employer. I'll show you <span className="italic gold-gradient">where to actually live.</span>
        </h2>
        <p className="text-sm sm:text-base mb-6 max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Columbus is landing generational investments — Intel, Anduril, Honda. If you're moving for one of these employers, here are the new-construction communities that put you closest with the best schools.
        </p>
        <div className="flex flex-wrap gap-2">
          {EMPLOYERS.map((emp) => {
            const active = selectedEmployer?.id === emp.id;
            return (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployer(active ? null : emp)}
                className="px-4 py-2.5 rounded-sm text-sm font-semibold transition-all hover:translate-y-[-1px]"
                style={{
                  background: active ? '#D4AF37' : 'rgba(255,255,255,0.04)',
                  color: active ? '#0A0A0B' : 'rgba(255,255,255,0.85)',
                  border: active ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
                }}
              >
                {emp.shortLabel}
              </button>
            );
          })}
          {selectedEmployer && (
            <button
              onClick={() => setSelectedEmployer(null)}
              className="px-3 py-2.5 rounded-sm text-sm transition-colors flex items-center gap-1"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        {selectedEmployer && (
          <div className="mt-6 p-6 rounded-sm fade-up" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.25)' }}>
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 rounded-sm items-center justify-center shrink-0" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                <Building2 className="w-5 h-5 gold" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="font-display text-xl gold" style={{ fontWeight: 500 }}>{selectedEmployer.name}</h3>
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>{selectedEmployer.badge}</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span><MapPin className="w-3.5 h-3.5 inline gold mr-1" /> {selectedEmployer.location}</span>
                  <span>Direction: <span className="text-white">{selectedEmployer.direction}</span></span>
                  <span>Commute: <span className="text-white">{selectedEmployer.commuteBand}</span></span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{selectedEmployer.context}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Filters */}
      <section id="vault" className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-4 h-4 gold" />
          <span className="text-xs uppercase tracking-widest" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)' }}>Refine your shortlist</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FilterDropdown label="Area" value={filterArea} options={AREA_OPTIONS} onChange={setFilterArea} />
          <FilterDropdown label="Price Range" value={filterPrice} options={PRICE_OPTIONS} onChange={setFilterPrice} />
          <FilterDropdown label="Incentive Type" value={filterIncentive} options={INCENTIVE_OPTIONS} onChange={setFilterIncentive} />
        </div>
        <div className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Showing <span className="gold font-semibold">{filteredBuilders.length}</span> of {BUILDERS.length} builders matching your filters{selectedEmployer && <span> · matched to <span className="gold">{selectedEmployer.shortLabel}</span></span>}
        </div>
      </section>

      {/* Builder grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(212,175,55,0.12)' }}>
          {filteredBuilders.map((builder, i) => (
            <BuilderCard key={builder.id} builder={builder} onClick={handleBuilderClick} index={i} />
          ))}
        </div>
        {filteredBuilders.length === 0 && (
          <div className="text-center py-16" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <p>No builders match these filters. Try widening your search.</p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 mt-12 border-t" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest gold mb-4" style={{ letterSpacing: '0.18em' }}>The next step</div>
            <h2 className="font-display text-4xl sm:text-5xl mb-6 leading-tight" style={{ fontWeight: 400 }}>
              The vault gets you <span className="italic gold-gradient">75% of the way.</span> I get you the rest.
            </h2>
            <p className="text-lg leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>
              15 minutes on a Zoom call and you'll know exactly which 2–3 builders are the right fit for your timeline, budget, and school district. No pitch. No commitment. Just clarity.
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Builder reps work for the builder. I work for you. My representation is 100% free to you — builders have already budgeted for it.
            </p>
          </div>
          <div className="rounded-sm border p-8" style={{ borderColor: 'rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.04)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Phone className="w-5 h-5 gold" />
              <span className="text-xs uppercase tracking-widest gold" style={{ letterSpacing: '0.18em' }}>15 Min Consult</span>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                'My honest take on the 2–3 builders that fit YOUR criteria',
                'This week\'s real incentive offers (rate buydowns, closing credits)',
                'School district + commute reality-check for your situation',
                'Zero pitch — if I\'m not the right fit, I\'ll tell you',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <Check className="w-4 h-4 gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-sm font-semibold text-sm transition-all hover:translate-y-[-1px]" style={{ background: '#D4AF37', color: '#0A0A0B' }}>
              <Phone className="w-4 h-4" /> Schedule a 15 Min Call <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Pick a slot that works — instant calendar confirmation
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <div className="font-display text-lg mb-1">Expert Partners | eXp Realty</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Columbus, OH · Specializing in new construction since 2011</div>
          </div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Vault data verified weekly. Incentives and inventory subject to change without notice. Independently verified before contract.
          </div>
        </div>
      </footer>

      {/* Builder detail modal */}
      {selectedBuilder && <BuilderModal builder={selectedBuilder} employer={selectedEmployer} onClose={() => setSelectedBuilder(null)} />}

      {/* High-intent popup - fires after 3 community clicks or 3 visits */}
      {showHighIntentPopup && (
        <HighIntentPopup
          onClose={() => setShowHighIntentPopup(false)}
        />
      )}
    </div>
  );
}

// ============================================================================
// Components
// ============================================================================

function FilterDropdown({ label, value, options, onChange }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em' }}>{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-4 py-3.5 rounded-sm text-sm cursor-pointer transition-colors focus:outline-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)', color: 'white' }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ background: '#0A0A0B', color: 'white' }}>{opt}</option>
          ))}
        </select>
        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 gold pointer-events-none" />
      </div>
    </label>
  );
}

const BuilderCard = memo(function BuilderCard({ builder, onClick, index }) {
  return (
    <button
      onClick={() => onClick(builder)}
      className="card-shine text-left p-7 transition-all hover:bg-white/[0.02] group fade-up"
      style={{ background: '#0A0A0B', animationDelay: `${Math.min(index, 8) * 0.04}s` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm" style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', letterSpacing: '0.15em', border: '1px solid rgba(212,175,55,0.25)' }}>
          {builder.badge}
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <Award className="w-3.5 h-3.5 gold" />
          <span>{builder.stars}</span>
        </div>
      </div>
      <h3 className="font-display text-2xl mb-2 group-hover:gold transition-colors" style={{ fontWeight: 500 }}>{builder.name}</h3>
      <div className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
        {builder.yearsInColumbus} yrs in Columbus · Featured this week
      </div>
      <div className="space-y-3 pb-5 mb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-baseline justify-between text-sm">
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Price range</span>
          <span className="font-semibold">{builder.priceRange}</span>
        </div>
        <div className="flex items-baseline justify-between text-sm">
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>In your bracket</span>
          <span className="gold font-semibold">{builder.targetMatch}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <MapPin className="w-3.5 h-3.5 gold" />
          <span>View community details</span>
        </div>
        <div className="text-sm flex items-center gap-1.5 gold opacity-70 group-hover:opacity-100 transition-opacity">
          View <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
});

function BuilderModal({ builder, employer, onClose }) {
  const matchedSet = useMemo(() => new Set(employer?.matchedCommunities || []), [employer]);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-lg sm:rounded-sm" style={{ background: '#0A0A0B', border: '1px solid rgba(212,175,55,0.25)' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 px-7 py-5 flex items-start justify-between border-b" style={{ background: '#0A0A0B', borderColor: 'rgba(212,175,55,0.15)' }}>
          <div>
            <div className="text-xs uppercase tracking-widest gold mb-1" style={{ letterSpacing: '0.18em' }}>{builder.badge} · {builder.yearsInColumbus} years</div>
            <h2 className="font-display text-3xl" style={{ fontWeight: 500 }}>{builder.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-sm transition-colors hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-7 py-6">
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>{builder.knownFor}</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8 pb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div>
              <div className="text-xs uppercase tracking-widest mb-3 gold flex items-center gap-2" style={{ letterSpacing: '0.18em' }}>
                <TrendingDown className="w-3.5 h-3.5" /> Typical Incentives
              </div>
              <ul className="space-y-2">
                {builder.typicalIncentives.map((inc, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <Check className="w-3.5 h-3.5 gold shrink-0 mt-0.5" /> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-3 gold" style={{ letterSpacing: '0.18em' }}>Quick Facts</div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt style={{ color: 'rgba(255,255,255,0.5)' }}>Overall range</dt><dd>{builder.priceRange}</dd></div>
                <div className="flex justify-between"><dt style={{ color: 'rgba(255,255,255,0.5)' }}>Your bracket</dt><dd className="gold">{builder.targetMatch}</dd></div>
                <div className="flex justify-between"><dt style={{ color: 'rgba(255,255,255,0.5)' }}>Builder type</dt><dd>{builder.builderType || 'Production'}</dd></div>
                <div className="flex justify-between"><dt style={{ color: 'rgba(255,255,255,0.5)' }}>Website</dt><dd>{builder.site}</dd></div>
              </dl>
            </div>
          </div>

          <div className="text-xs uppercase tracking-widest mb-4 gold flex items-center gap-2" style={{ letterSpacing: '0.18em' }}>
            Communities in your 45-mile radius
            {employer && <span className="px-2 py-0.5 rounded-sm text-[10px]" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>★ = matched to {employer.shortLabel}</span>}
          </div>
          <div className="space-y-2 mb-8">
            {builder.communities.map((c, i) => {
              const isMatched = matchedSet.has(c.name);
              return (
                <div key={i} className="grid grid-cols-12 gap-3 p-4 rounded-sm" style={{
                  background: isMatched ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.025)',
                  border: isMatched ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div className="col-span-12 sm:col-span-5">
                    <div className="font-semibold mb-0.5 flex items-center gap-2">
                      {isMatched && <span className="gold text-sm">★</span>}
                      {c.name}
                    </div>
                    <div className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <MapPin className="w-3 h-3" /> {c.area} · {c.miles}mi from 43215
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>School District</div>
                    <div className="text-sm">{c.district}</div>
                  </div>
                  <div className="col-span-6 sm:col-span-3 text-right">
                  <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Range</div>
                  <div className="text-sm gold font-semibold">{c.range}</div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="rounded-sm p-6 flex items-start gap-4" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}>
            <Phone className="w-5 h-5 gold shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Want my honest take on {builder.name}?</div>
              <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>15 minutes on Zoom and I'll walk you through their current QMI list, this week's actual incentive offers, and the pros/cons you won't find on their website.</div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-sm text-sm font-semibold flex items-center gap-2 transition-all hover:translate-x-0.5" style={{ background: '#D4AF37', color: '#0A0A0B' }}>
                  <Phone className="w-4 h-4" /> Schedule a 15 Min Call <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighIntentPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 fade-up"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-lg sm:rounded-sm overflow-hidden"
        style={{ background: '#0A0A0B', border: '1px solid rgba(212,175,55,0.4)', boxShadow: '0 0 60px rgba(212,175,55,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-xs uppercase tracking-widest gold mb-1" style={{ letterSpacing: '0.18em' }}>
                I notice you're digging in.
              </div>
              <h3 className="font-display text-2xl leading-tight" style={{ fontWeight: 500 }}>
                Save yourself the legwork.
              </h3>
            </div>
            <button onClick={onClose} className="p-1 -mr-1 -mt-1 rounded-sm hover:bg-white/5" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
            You've clicked into multiple builders — you're seriously considering this. Skip the rest of the research. 15 minutes on Zoom and I'll tell you exactly which 2–3 builders are right for your situation. No pitch, no commitment.
          </p>

          <div className="space-y-3">
            <a
              href={SCHEDULER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-sm font-semibold text-sm transition-all hover:translate-y-[-1px]"
              style={{ background: '#D4AF37', color: '#0A0A0B' }}
            >
              <Phone className="w-4 h-4" /> Schedule a 15 Min Call <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="w-full text-center text-xs hover:gold transition-colors py-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
