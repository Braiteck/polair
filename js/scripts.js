$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper-container').each(function (i) {
		$(this).addClass('products_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: $(this).hasClass('big_m') ? 52 : 20,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					bulletActiveClass: 'active'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1280: {
						slidesPerView: 4
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							productHeight($(this), $(swiper.$el).find('.product').length)
						})
					},
					resize: swiper => {
						setTimeout(() => {
							productHeight($(this), $(swiper.$el).find('.product').length)
						})
					}
				}
			}

		productsSliders.push(new Swiper('.products_s' + i, options))

		if (slides > productsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			productsSliders[i].destroy(true, true)
			productsSliders[i] = new Swiper('.products_s' + i, options)
		}
	})


	// Карусель отзывов
	const productReviewsSliders = []

	$('.product_reviews .swiper-container').each(function (i) {
		$(this).addClass('product_reviews_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					bulletActiveClass: 'active'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						spaceBetween: 24,
						slidesPerView: 1
					},
					768: {
						spaceBetween: 24,
						slidesPerView: 1
					},
					1024: {
						spaceBetween: 24,
						slidesPerView: 2
					},
					1280: {
						spaceBetween: 30,
						slidesPerView: 2
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.review'))
						})
					},
					resize: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.review'))
						})
					}
				}
			}

		productReviewsSliders.push(new Swiper('.product_reviews_s' + i, options))

		if (slides > productReviewsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			productReviewsSliders[i].destroy(true, true)
			productReviewsSliders[i] = new Swiper('.product_reviews_s' + i, options)
		}
	})


	// Сравнение товаров
	if ($('.compare_info .swiper-container').length) {
		new Swiper('.compare_info .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 2,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						setHeight($(swiper.$el).find('.product .name'))

						compareHeight()

						let pag_W = $(swiper.$el).find('.swiper-pagination').width(),
							arrow_W = $(swiper.$el).find('.swiper-button-prev').width()

						$(swiper.$el).find('.swiper-button-prev').css('margin-left', pag_W / -2 - arrow_W * 1.3 + 'px')
						$(swiper.$el).find('.swiper-button-next').css('margin-right', pag_W / -2 - arrow_W * 1.3 + 'px')
					})
				},
				resize: swiper => {
					setTimeout(() => {
						setHeight($(swiper.$el).find('.product .name'))

						compareHeight()
					})
				}
			}
		})
	}


	// Страница товара
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.thumbs-swiper-button-next',
				prevEl: '.thumbs-swiper-button-prev'
			},
			slidesPerView: 3,
			spaceBetween: 10
		})

		new Swiper('.product_info .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	// Страница товара - Габаритные размеры
	if ($('.product_dimensions .swiper-container').length) {
		new Swiper('.product_dimensions .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 46,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Поиск - Подсказки
	$('header .search form .input').keydown(function (e) {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length > 2
				? $('header .search .tips, .overlay').fadeIn(300)
				: $('header .search .tips, .overlay').fadeOut(200)
		})
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Боковая колонка - Категории
	$('aside .mob_btns .categories_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$('aside .mob_btns .filter_btn').removeClass('active')
			$('aside .filter').slideUp(300)

			$(this).toggleClass('active')
			$('aside .categories').slideToggle(300)
		} else {
			$('aside .mob_btns .btn').removeClass('active')
			$('aside .categories, aside .filter').slideUp(300)
		}
	})

	$('aside .categories .spoler_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.categories')

		$(this).toggleClass('active')
		parent.find('.sub').slideToggle(300)
	})


	// Боковая колонка - Фильтр
	$('aside .mob_btns .filter_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$('aside .mob_btns .categories_btn').removeClass('active')
			$('aside .categories').slideUp(300)

			$(this).toggleClass('active')
			$('aside .filter').slideToggle(300)
		} else {
			$('aside .mob_btns .btn').removeClass('active')
			$('aside .categories, aside .filter').slideUp(300)
		}
	})

	$('.mob_filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	$('aside .filter .name').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')
		parent.find('.data').slideToggle(300)
	})


	$priceRange = $('.filter #price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 100000,
		from: 0,
		to: 100000,
		step: 5,
		grid: true,
		onChange: data => {
			$('.filter .price_range input.from').val(data.from)
			$('.filter .price_range input.to').val(data.to)

			$('.filter .price_range .from_text span').text(data.from)
			$('.filter .price_range .to_text span').text(data.to)
		},
		onUpdate: data => {
			$('.filter .price_range input.from').val(data.from)
			$('.filter .price_range input.to').val(data.to)

			$('.filter .price_range .from_text span').text(data.from)
			$('.filter .price_range .to_text span').text(data.to)
		}
	}).data("ionRangeSlider")

	$('.filter .price_range .input').keyup(function () {
		$priceRange.update({
			from: parseFloat($('.filter .price_range input.from').val()),
			to: parseFloat($('.filter .price_range input.to').val())
		})
	})

	$('.filter .reset_btn').click(function () {
		$('.filter input').removeAttr('checked')

		$priceRange.reset()
	})


	// Оформление заказа - Местоположение
	$('.checkout_info .steps .step .location .input').keydown(function (e) {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length > 2
				? $('.checkout_info .steps .step .location .tips').fadeIn(300)
				: $('.checkout_info .steps .step .location .tips').fadeOut(200)
		})
	})


	// Оформление заказа - Авторизация
	$('.checkout_info .steps .type label').click(function () {

		let parent = $(this).closest('.auth')

		parent.find('.login_form, .register_form').hide()
		parent.find($(this).data('form')).fadeIn(300)
	})


	// Оформление заказа - Выбор метода доставки
	$('.checkout_info .steps .delivery_info .methods label').click(function () {
		let delivery = $(this).closest('.delivery_info'),
			content = $(this).data('content')

		delivery.find('.current').hide()
		delivery.find(content).fadeIn(300)
	})


	// Оформление заказа - Выбор метода оплаты
	$('.checkout_info .steps .payment_info .methods label').click(function () {
		let payment = $(this).closest('.payment_info'),
			content = $(this).data('content')

		payment.find('.current').hide()
		payment.find(content).fadeIn(300)
	})


	// Оформление заказа - Назад
	$('.checkout_info .steps .step .prev_btn').click(function (e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		step.removeClass('active').find('.data').slideToggle(300)
		step.prev().removeClass('finished').addClass('active').find('.data').slideToggle(300)
	})

	// Оформление заказа - Далее
	$('.checkout_info .steps .step .next_btn').click(function (e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		step.addClass('finished').removeClass('active').find('.data').slideToggle(300)
		step.next().addClass('active').find('.data').slideToggle(300)
	})


	// Личный кабинет - Взод/Регистрация
	$('.lk_info .auth .mob_btns .btn.login_btn').click(function (e) {
		e.preventDefault()

		let auth = $(this).closest('.auth')

		$('.lk_info .auth .mob_btns .btn').removeClass('active')
		$(this).addClass('active')

		auth.find('.register_form').hide()
		auth.find('.login_form').fadeIn(300)
	})

	$('.lk_info .auth .mob_btns .btn.register_btn').click(function (e) {
		e.preventDefault()

		let auth = $(this).closest('.auth')

		$('.lk_info .auth .mob_btns .btn').removeClass('active')
		$(this).addClass('active')

		auth.find('.login_form').hide()
		auth.find('.register_form').fadeIn(300)
	})


	// Моб. каталог
	$('.mob_fixed_panel .catalog_btn').click(function (e) {
		e.preventDefault()

		if (!$('.mob_fixed_panel .catalog_btn').hasClass('active')) {
			$('.mob_fixed_panel a, .mob_fixed_panel button').removeClass('active')
			$('.mob_fixed_panel .catalog_btn').addClass('active')

			$('.mob_catalog').fadeIn(300)
		} else {
			$('.mob_fixed_panel a, .mob_fixed_panel button').removeClass('active')
			$('.mob_catalog').fadeOut(200)
		}
	})

	$('.mob_catalog .category .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).prev().toggleClass('active')
		$(this).next().slideToggle(300)
	})


	// Моб. меню
	$('.mob_fixed_panel .menu_btn').click(function (e) {
		e.preventDefault()

		if (!$('.mob_fixed_panel .menu_btn').hasClass('active')) {
			$('.mob_fixed_panel a, .mob_fixed_panel button').removeClass('active')
			$('.mob_fixed_panel .menu_btn').addClass('active')

			$('.mob_menu').fadeIn(300)
		} else {
			$('.mob_fixed_panel a, .mob_fixed_panel button').removeClass('active')
			$('.mob_menu').fadeOut(200)
		}
	})


	// Отправка форм
	$('body').on('submit', '#add_review_modal form', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#add_review_success_modal',
			type: 'inline'
		}])
	})

	$('body').on('submit', '#callback_modal form', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#callback_success_modal',
			type: 'inline'
		}])
	})

	$('body').on('submit', '#quike_buy_modal form', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#quike_buy_success_modal',
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})

	$('.reviews .row').each(function () {
		reviewHeight($(this), parseInt($(this).css('--reviews_count')))
	})


	// Новости
	if ($('.articles .swiper-container').length) {
		articlesSlider = []

		if ($(window).width() < 1024) articlesSliderInit()
	}

	$('.articles .row').each(function () {
		articleHeight($(this), parseInt($(this).css('--articles_count')))
	})


	// Отзывы
	if ($('.reviews .swiper-container').length) {
		reviewsSlider = []

		if ($(window).width() < 1024) reviewsSliderInit()
	}


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).on('resize', () => {
	if (WW != $(window).width()) {
		// Перезапись ширины окна
		WW = $(window).width()


		// Выравнивание элементов в сетке
		$('.products .row').each(function () {
			productHeight($(this), parseInt($(this).css('--products_count')))
		})

		$('.reviews .row').each(function () {
			reviewHeight($(this), parseInt($(this).css('--reviews_count')))
		})


		// Новости
		if ($('.articles .swiper-container').length) {
			$(window).width() < 1024
				? articlesSliderInit()
				: articlesSliderDestroy()
		}

		$('.articles .row').each(function () {
			articleHeight($(this), parseInt($(this).css('--articles_count')))
		})


		// Отзывы
		if ($('.reviews .swiper-container').length) {
			$(window).width() < 1024
				? reviewsSliderInit()
				: reviewsSliderDestroy()
		}


		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > headerHeight
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)
	}
})



$(window).on('scroll', () => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.product_name, .features > *').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.product_name'))

		$products.slice(start, finish).find('.features > *').each(function (i) {
			setHeight($products.slice(start, finish).find('.features > *:eq(' + i + ')'))
		})

		start = start + step
		finish = finish + step
	})
}


// Выравнивание Отзывов
function reviewHeight(context, step) {
	let start = 0,
		finish = step,
		$reviews = context.find('.review')

	$reviews.find('.review').height('auto')

	$reviews.each(() => {
		setHeight($reviews.slice(start, finish))

		start = start + step
		finish = finish + step
	})
}


// Выравнивание статей
function articleHeight(context, step) {
	let start = 0,
		finish = step,
		$articles = context.find('.article')

	$articles.find('.name, .desc').height('auto')

	$articles.each(function () {
		setHeight($articles.slice(start, finish).find('.name'))
		setHeight($articles.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	})
}



// Выравнивание в сравнении
function compareHeight() {
	$('.compare_info .compare_features > *, .compare_info .compare_product_features > *').height('auto')

	let productFeatures = $('.compare_info .compare_product_features'),
		compareFeatures = $('.compare_info .compare_features'),
		sizes = new Object()

	productFeatures.each(function () {
		$(this).find('> *').each(function () {
			if (sizes[$(this).index()]) {
				if ($(this).outerHeight() > sizes[$(this).index()]) {
					sizes[$(this).index()] = $(this).outerHeight()
				}
			} else {
				sizes[$(this).index()] = $(this).outerHeight()
			}
		})
	})

	compareFeatures.each(function () {
		$(this).find('> *').each(function () {
			if (sizes[$(this).index()]) {
				if ($(this).outerHeight() > sizes[$(this).index()]) {
					sizes[$(this).index()] = $(this).outerHeight()
				}
			} else {
				sizes[$(this).index()] = $(this).outerHeight()
			}
		})
	})

	$.each(sizes, (key, data) => {
		productFeatures.each(function () {
			$(this).find('> *:eq(' + key + ')').innerHeight(data)
		})

		$('.compare_info .compare_features > *:eq(' + key + ')').innerHeight(data)
	})

	$('.compare_info .compare_filter').css('top', $('.compare_info .product').outerHeight())
}



// Новости
const articlesSliderInit = () => {
	$('.articles .swiper-wrapper').removeClass('row')

	$('.articles .swiper-container').each(function () {
		articlesSlider = new Swiper('.articles .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 40,
					slidesPerView: 1
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 2
				}
			}
		})
	})
}

const articlesSliderDestroy = () => {
	articlesSlider.destroy(true, true)
	$('.articles .swiper-wrapper, .articles .swiper-slide').removeAttr('style')
	$('.articles .swiper-wrapper').addClass('row')
}



// Отзывы
const reviewsSliderInit = () => {
	$('.reviews .swiper-wrapper').removeClass('row')

	$('.reviews .swiper-container').each(function () {
		articlesSlider = new Swiper('.reviews .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 40,
					slidesPerView: 1
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 2
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						reviewHeight($(this), $(swiper.$el).find('.review').length)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						reviewHeight($(this), $(swiper.$el).find('.review').length)
					})
				}
			}
		})
	})
}

const reviewsSliderDestroy = () => {
	reviewsSlider.destroy(true, true)
	$('.reviews .swiper-wrapper, .reviews .swiper-slide').removeAttr('style')
	$('.reviews .swiper-wrapper').addClass('row')
}



