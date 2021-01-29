//
//  ViewController.m
//  myOCProject
//
//  Created by Mac on 2019/12/11.
//  Copyright © 2019 Mac. All rights reserved.
//

#import "ViewController.h"
#import "user_audio_wave.h"
#import "ReportsListViewController.h"

@interface ViewController ()
@property(nonatomic,strong) UIButton *btn;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    // Do any additional setup after loading the view.
    _btn = [UIButton buttonWithType:UIButtonTypeCustom];
    [_btn setTitle:@"test" forState:UIControlStateNormal];
    [_btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [_btn addTarget:self action:@selector(clickevent) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_btn];
    [_btn makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(100);
        make.left.equalTo(100);
    }];
    
}

-(void)clickevent{
    ReportsListViewController *vc = [[ReportsListViewController alloc] init];
    [self.navigationController pushViewController:vc animated:YES];
}

@end
