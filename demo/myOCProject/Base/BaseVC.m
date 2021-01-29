//
//  BaseVC.m
//  Qibuer
//
//  Created by Tracyhenry on 2021/01/25.
//  Copyright © 2021 SiterWell. All rights reserved.
//

#import "BaseVC.h"

@interface BaseVC ()

@end

@implementation BaseVC

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.leftBarButtonItem = [self itemWithTarget:self action:@selector(finish) image:@"back_icon" highImage:nil withTintColor:nil withSpace:-25];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}
-(void)viewWillAppear:(BOOL)animated{
    if (@available(iOS 13.0, *)) {
     [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDarkContent];
     } else {
     [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
     }
    [[UINavigationBar appearance] setBarTintColor:[UIColor whiteColor]];
    [self.navigationController.navigationBar setBackgroundColor:[UIColor whiteColor]];
    self.navigationController.navigationBar.titleTextAttributes = @{NSForegroundColorAttributeName:[UIColor blackColor]};

}

-(void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];

}

- (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action image:(NSString *)image highImage:(NSString *)highImage withTintColor:(UIColor *)color withSpace:(CGFloat)space
{
    
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeSystem];
    UIImage *img= nil;
    if(color==nil){
        img=[[UIImage imageNamed:image] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    }
    else{
        img=[UIImage imageNamed:image];
        [btn setTintColor:color];
    }

    [btn setImage:img forState:UIControlStateNormal];
    
    [btn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    CGSize btnSize = CGSizeMake(44, 44);
    CGRect frame = btn.frame;
    frame.size = btnSize;
    btn.frame = frame;
    [btn setImageEdgeInsets:UIEdgeInsetsMake(0, space, 0, 0)];
    return [[UIBarButtonItem alloc] initWithCustomView:btn];
}

- (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action image:(NSString *)image text:(NSString *)content withTintColor:(UIColor *)color
{
    
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    UIImage *img= nil;
    if(color==nil){
        img=[[UIImage imageNamed:image] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    }
    else{
        img=[UIImage imageNamed:image];
        [btn setTintColor:color];
    }
    NSDictionary *attrs2 = @{NSFontAttributeName : SYSTEMFONT(15)};
    CGSize size2=[content sizeWithAttributes:attrs2];
    [btn setImage:img forState:UIControlStateNormal];
    [btn setTitle:content forState:UIControlStateNormal];
    [btn setTitleColor:ThemeColor forState:UIControlStateNormal];
    [btn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    CGSize btnSize = CGSizeMake(size2.width+44, 44);
    CGRect frame = btn.frame;
    frame.size = btnSize;
    btn.frame = frame;
    return [[UIBarButtonItem alloc] initWithCustomView:btn];
}


/**
 自定义navbar按钮

 @param target 目标
 @param action 动作
 @param title 文字
 @param color tint颜色
 @return 按钮
 */
- (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action Title:(NSString *)title withTintColor:(UIColor *)color
{
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeSystem];
    [btn setTitle:title forState:UIControlStateNormal];
    [btn setTintColor:color];
    [btn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    btn.titleLabel.font = [UIFont boldSystemFontOfSize:16];
    CGSize btnSize = CGSizeMake(44, 44);
    CGRect frame = btn.frame;
    frame.size = btnSize;
    btn.frame = frame;
    return [[UIBarButtonItem alloc] initWithCustomView:btn];
}

-(void)finish{
    [self.navigationController popViewControllerAnimated:YES];
}

//UIColor 转UIImage（UIImage+YYAdd.m也是这种实现）
- (UIImage*) createImageWithColor: (UIColor*) color
{
    CGRect rect=CGRectMake(0.0f, 0.0f, 1.0f, 1.0f);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return theImage;
}

@end
