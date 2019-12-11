//
//  MainViewController.m
//  sHome
//
//  Created by TracyHenry on 2019/03/09.
//  Copyright © 2019年 TracyHenry. All rights reserved.
//

#import "MainViewController.h"
#import "ViewController.h"
#import "WebViewController.h"

@interface MainViewController () <UITabBarControllerDelegate,CLLocationManagerDelegate>
@property (nonatomic) CLLocationManager *locationMgr;
@end

@implementation MainViewController

#pragma mark -life
- (void)viewDidLoad {
    [super viewDidLoad];
    self.delegate = self;
    [self configTabBarAppearance];
    
    WebViewController *demo = [[WebViewController alloc] init];
    demo.tabBarItem = [[UITabBarItem alloc] initWithTitle:NSLocalizedString(@"设备", nil)
                                                    image:[UIImage imageNamed:@"tab_home"]
                                            selectedImage:[UIImage imageNamed:@"tab_home_selected"]];
    
    ViewController *debug = [[ViewController alloc] init];
    debug.tabBarItem = [[UITabBarItem alloc] initWithTitle:NSLocalizedString(@"安全评分", nil)
                                                     image:[UIImage imageNamed:@"tab_debug"]
                                             selectedImage:[UIImage imageNamed:@"tab_debug_selected"]];
    
    ViewController *profile = [[ViewController alloc] init];
    profile.tabBarItem = [[UITabBarItem alloc] initWithTitle:NSLocalizedString(@"我的", nil)
                                                       image:[UIImage imageNamed:@"tab_profile"]
                                               selectedImage:[UIImage imageNamed:@"tab_profile_selected"]];
    
    [self tabbarSetNomalAndSelectColor:demo.tabBarItem];
    [self tabbarSetNomalAndSelectColor:debug.tabBarItem];
    [self tabbarSetNomalAndSelectColor:profile.tabBarItem];
    
    UINavigationController *linkNav = [[UINavigationController alloc] initWithRootViewController:demo];
    
    UIFont *font = [UIFont fontWithName:@"PingFangSC-Regular"
                                   size:18];
    linkNav.navigationBar.titleTextAttributes = [NSDictionary dictionaryWithObjectsAndKeys:font, NSFontAttributeName, nil];
    
    UINavigationController *debugNav = [[UINavigationController alloc] initWithRootViewController:debug];
    
    UINavigationController *profileNav = [[UINavigationController alloc] initWithRootViewController:profile];
    profileNav.navigationBar.titleTextAttributes = [NSDictionary dictionaryWithObjectsAndKeys:font, NSFontAttributeName, nil];
    
    self.viewControllers = @[linkNav, debugNav, profileNav];
    if ([CLLocationManager locationServicesEnabled]) {
        self.locationMgr = [[CLLocationManager alloc] init];
        self.locationMgr.delegate = self;
        self.locationMgr.desiredAccuracy = kCLLocationAccuracyKilometer;
        [self.locationMgr requestAlwaysAuthorization];
        self.locationMgr.distanceFilter = 10.0f;
        [self.locationMgr startUpdatingLocation];
    }
    //[self showToolBox];

}

#pragma mark - UITabBarConfig

- (void)configTabBarAppearance {
    UITabBar *tabBar = [UITabBar appearance];
    tabBar.barTintColor = [UIColor whiteColor];
}


#pragma mark -


- (void)tabbarSetNomalAndSelectColor:(UITabBarItem *)item {
    [item setTitleTextAttributes:@{NSForegroundColorAttributeName :  NetiveColor}
                                      forState:UIControlStateNormal];
    [item setTitleTextAttributes:@{NSForegroundColorAttributeName : ThemeColor}
                                      forState:UIControlStateSelected];
}


#pragma mark -delegate
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
    if ([error code] == kCLErrorDenied) {
        NSLog(@"访问被拒绝");
    }
    if ([error code] == kCLErrorLocationUnknown) {
        NSLog(@"无法获取位置信息");
    }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    
}

@end
