//
//  NetWorkBaseUrlConfig.m
//  MobileProject
//
//  Created by wujunyang on 16/1/5.
//  Copyright © 2016年 wujunyang. All rights reserved.
//

#import "NetWorkBaseUrlConfig.h"
#import "MPFileManager.h"

static NSString *const developer = @"developer";
static NSString *const product = @"product";

static NSString *const ACCOUNT_SERVERCENTER_Key=@"ACCOUNT_SERVERCENTER";
static NSString *const PICTURE_SERVERCENTER_key=@"PICTURE_SERVERCENTER";
static NSString *const BUSINESSLOGIC_SERVERCENTER_key=@"BUSINESSLOGIC_SERVERCENTER";
static NSString *const UPDATEVERSION_SERVERCENTER_key=@"UPDATEVERSION_SERVERCENTER";
static NSString *const WEATHER_SERVERCENTER_key=@"WEATHER_SERVERCENTER";

@interface NetWorkBaseUrlConfig()
@property(nonatomic ,assign) SERVERCENTER_TYPE netType;
@property(nonatomic ,strong) NSMutableDictionary *configDictionary;
//开发测试环境
@property(nonatomic ,strong) NSDictionary *develpoerDictionary;
//产品环境
@property(nonatomic ,strong) NSDictionary *productDictionary;
@end

@implementation NetWorkBaseUrlConfig

+(instancetype)shareconfig
{
    static id share;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        share = [[NetWorkBaseUrlConfig alloc] init];
    });
    
    return share;
}

-(id)init
{
    if (self == [super init]) {
        //测试环境
        NSDictionary *dics1 = [MPFileManager getJsonDataFromFile:@"config_proj.json"];
        NSString *AppId = [dics1 objectForKey:@"appid"];
        self.develpoerDictionary=@{ACCOUNT_SERVERCENTER_Key:@"http://uaa.openapi.hekr.me",
                                   PICTURE_SERVERCENTER_key:@"http://uaa.openapi.hekr.me",
                                   WEATHER_SERVERCENTER_key:@"https://user-openapi.hekr.me",
                                   BUSINESSLOGIC_SERVERCENTER_key:@"业务逻辑前缀",
                                   UPDATEVERSION_SERVERCENTER_key:[@"http://itunes.apple.com/lookup?id=" stringByAppendingString:AppId]};
        //产品环境
        self.productDictionary=@{ACCOUNT_SERVERCENTER_Key:@"http://uaa.openapi.hekr.me",
                                 PICTURE_SERVERCENTER_key:@"http://uaa.openapi.hekr.me",
                                 WEATHER_SERVERCENTER_key:@"https://user-openapi.hekr.me",
                                 BUSINESSLOGIC_SERVERCENTER_key:@"业务逻辑前缀",
                                 UPDATEVERSION_SERVERCENTER_key:[@"http://itunes.apple.com/lookup?id=" stringByAppendingString:AppId]};
        
        self.configDictionary = [NSMutableDictionary dictionary];
        [self.configDictionary setObject:self.develpoerDictionary forKey:developer];
        [self.configDictionary setObject:self.productDictionary forKey:product];
    }
    return self;
}

-(NSString*)urlWithCenterType:(SERVERCENTER_TYPE)type
{
    NSString *urlResult=@"";
    NSString *validEnvironment = @"";
    
    //过滤不同Tag
    #ifdef LOCAL
    validEnvironment=developer;
    #else
    validEnvironment=product;
    #endif
    
    NSString *urlKey = @"";
    switch (type) {
        case ACCOUNT_SERVERCENTER:
            urlKey = ACCOUNT_SERVERCENTER_Key;
            break;
        case PICTURE_SERVERCENTER:
            urlKey = PICTURE_SERVERCENTER_key;
            break;
        case BUSINESSLOGIC_SERVERCENTER:
            urlKey = BUSINESSLOGIC_SERVERCENTER_key;
            break;
        case UPDATEVERSION_SERVERCENTER:
            urlKey = UPDATEVERSION_SERVERCENTER_key;
            break;
        case WEATHER_SERVERCENTER:
            urlKey = WEATHER_SERVERCENTER_key;
            break;
        default:
            break;
    }
    urlResult = self.configDictionary[validEnvironment][urlKey];
    return urlResult;
}

@end
