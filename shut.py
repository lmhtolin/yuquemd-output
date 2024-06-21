from PIL import Image, ImageDraw

def crop_circle(image_path, output_path, size):
    # 打开图像文件
    img = Image.open(image_path)
    
    # 将图像转换为正方形，确保图像为圆形
    width, height = img.size
    min_side = min(width, height)
    img = img.crop(((width - min_side) // 2, (height - min_side) // 2, (width + min_side) // 2, (height + min_side) // 2))
    
    # 缩放图像
    img = img.resize(size, Image.Resampling.LANCZOS)
    
    # 创建一个透明背景的图像
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=255)  # 画一个白色圆形

    # 应用掩码到原图像
    result = Image.new('RGBA', size, (0, 0, 0, 0))
    result.paste(img, (0, 0), mask)
    
    # 保存图像
    result.save(output_path)

def to_grey(image_path, output_path):
    # 打开图片文件
    image = Image.open(image_path)
    # 转换为灰度图像
    grey_image = image.co1nvert('L')
    # 保存灰度图像
    grey_image.save(output_path)
    # 显示灰度图像
    grey_image.show()

# 使用函数
crop_circle('./final1-grey.png', './final1-grey.png', (128, 128))
# to_grey('./final1.png', './final1-grey.png')