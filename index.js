(($) => {
    let setDataTableAjaxData = (options, $table) => {
        let ajaxData = $table.data('ajax-data');
        let data = {};

        for (let i = 0; i < ajaxData.length; i++) {
            let $field = $(ajaxData[i]);

            if ($field.attr('type') === 'checkbox') {
                data[$field.attr('name')] = $field.prop('checked');
            } else if ($field.attr('type') === 'radio') {
                data[$field.attr('name')] = $(`[name=${$field.attr('name')}]:checked`).val();
            } else {
                data[$field.attr('name')] = $field.val();
            }
        }

        return data;
    };

    let initDataTables = () => {
        $('.data-table').each(function () {
            let $this = $(this);

            let options = {
                columnDefs: [{
                    targets: 'no-sort',
                    orderable: false,
                    searchable: false
                }, {
                    targets: 'actions',
                    className: 'text-center'
                }],
                order: [],
                lengthMenu: [10, 20, 30, 50, 75, 100],
            };

            if ($this.hasClass('data-table-ajax')) {
                options.processing = true;
                options.serverSide = true;
                options.ajax = {};
                options.ajax.url = $this.data('url');

                if ($this.data('ajax-data') && $this.data('ajax-data').length) {
                    options.ajax.data = setDataTableAjaxData(options, $this);
                }
            }

            let table = $this.dataTable(options);
            if ($this.hasClass('data-table-ajax') && $this.data('ajax-data') && $this.data('ajax-data').length) {
                let ajaxData = $this.data('ajax-data');

                for (let i = 0; i < ajaxData.length; i++) {
                    let $field = $(ajaxData[i]);

                    $field.on('change', function () {
                        options.ajax.data = setDataTableAjaxData(options, $this);
                        table.api().destroy();
                        $this.dataTable(options);
                    });
                }
            }
        });
    };

    initDataTables();

})(jQuery);


