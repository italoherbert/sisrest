package italo.sisrest.util;

import italo.sisrest.controller.dto.response.OptionResponse;
import italo.sisrest.model.enums.EnumOption;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OptionManager {

    public <T extends Enum<T>> T getEnum( String name, T[] values ) {
        for( T value : values )
            if ( name.equalsIgnoreCase( value.name() ) )
                return value;
        return null;
    }

    public OptionResponse response(EnumOption option ) {
        OptionResponse resp = new OptionResponse();
        if ( option == null ) {
            resp.setName( "" );
            resp.setLabel( "" );
        } else {
            resp.setName( option.name() );
            resp.setLabel( option.label() );
        }

        return resp;
    }

    public List<OptionResponse> responseList(EnumOption[] values) {
        List<OptionResponse> list = new ArrayList<>();

        for( EnumOption op : values )
            list.add( this.response( op ) );

        return list;
    }


}
