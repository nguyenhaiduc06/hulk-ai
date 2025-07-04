import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';

/**
 * Test function to check if RevenueCat is properly configured
 */
export async function testRevenueCatConnection(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log('RevenueCat connection test successful:', customerInfo);
    return true;
  } catch (error) {
    console.error('RevenueCat connection test failed:', error);
    return false;
  }
}

/**
 * Get current customer info
 */
export async function getCurrentCustomerInfo(): Promise<CustomerInfo | null> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('Error getting customer info:', error);
    return null;
  }
}

/**
 * Get available offerings
 */
export async function getAvailableOfferings(): Promise<PurchasesOffering[]> {
  try {
    const offerings = await Purchases.getOfferings();
    return Object.values(offerings.all);
  } catch (error) {
    console.error('Error getting offerings:', error);
    return [];
  }
}

/**
 * Check if user has premium entitlement
 */
export async function checkPremiumStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return typeof customerInfo.entitlements.active['premium'] !== 'undefined';
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
}

/**
 * Log customer info for debugging
 */
export async function logCustomerInfo(): Promise<void> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log('=== Customer Info ===');
    console.log('Original App User ID:', customerInfo.originalAppUserId);
    console.log('Active Entitlements:', Object.keys(customerInfo.entitlements.active));
    console.log('All Entitlements:', Object.keys(customerInfo.entitlements.all));
    console.log('Active Purchases:', Object.keys(customerInfo.activeSubscriptions));
    console.log('All Purchases:', Object.keys(customerInfo.allPurchasedProductIdentifiers));
    console.log('=== End Customer Info ===');
  } catch (error) {
    console.error('Error logging customer info:', error);
  }
}

/**
 * Log available offerings for debugging
 */
export async function logAvailableOfferings(): Promise<void> {
  try {
    const offerings = await Purchases.getOfferings();
    console.log('=== Available Offerings ===');
    console.log('Current Offering ID:', offerings.current?.identifier);
    console.log('All Offerings:', Object.keys(offerings.all));

    Object.values(offerings.all).forEach((offering) => {
      console.log(`Offering ${offering.identifier}:`);
      offering.availablePackages.forEach((pkg) => {
        console.log(`  - ${pkg.identifier}: ${pkg.product.title} (${pkg.product.priceString})`);
      });
    });
    console.log('=== End Available Offerings ===');
  } catch (error) {
    console.error('Error logging offerings:', error);
  }
}
