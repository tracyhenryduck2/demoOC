//
//  NSData+CRC16.h
//  CRC16_iOS
//
//  Created by Echo on 16/3/21.
//  Copyright © 2016年 Liu Xuanyi. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSData (CRC16)

+ (uint16_t)crc16:(const char *)buf length:(int)len;

@end
