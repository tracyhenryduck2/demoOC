//
//  BaseVC.h
//  Qibuer
//
//  Created by Tracyhenry on 2021/01/25.
//  Copyright © 2021 SiterWell. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UINavigationBar+Awesome.h"
@interface BaseVC : UIViewController
- (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action image:(NSString *)image text:(NSString *)content withTintColor:(UIColor *)color;
- (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action image:(NSString *)image highImage:(NSString *)highImage withTintColor:(UIColor *)color withSpace:(CGFloat)space;
- (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action Title:(NSString *)title withTintColor:(UIColor *)color;
- (UIImage*) createImageWithColor: (UIColor*) color;
@end
