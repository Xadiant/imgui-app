CPP = sokol/sokol_app.h
CPP += sokol/sokol_gfx.h
CPP += sokol/sokol_time.h
CPP += sokol/sokol_glue.h
CPP += imgui/imgui_draw.cpp
CPP += imgui/imgui_tables.cpp
CPP += imgui/imgui_widgets.cpp
CPP += imgui/imgui_demo.cpp
CPP += imgui/imgui.cpp
CPP += sokol/util/sokol_imgui.h

TGZ=imgui_app_$(shell cd imgui; git describe --tags).tgz


$(TGZ): imgui.h imgui_app.cpp README.md
	@echo "Creating $(TGZ)"
	@tar -cvzf $@ $^

.PHONY: header.txt clean

header.txt: imgui sokol
	@echo "// ----------------------------------------------------------------------------" > $@
	@echo "// File generated by imgui-app. By Jose L. Hidalgo (PpluX) @ 2021" >> $@
	@echo "// ----------------------------------------------------------------------------" >> $@
	@(cd imgui; git log --pretty="// imgui:%n//    %H(%ad)" -1 >> ../header.txt )
	@(cd sokol; git log --pretty="// sokol:%n//    %H(%ad)" -1 >> ../header.txt )
	@echo "// ----------------------------------------------------------------------------" >> $@

imgui.h: src/imgui_app.h imgui/imgui.h header.txt
	@cat header.txt > $@
	@cat src/imgui_app.h >> $@
	@echo "#define IMGUI_DISABLE_INCLUDE_IMCONFIG_H\n" >> $@
	@cat imgui/imgui.h >> $@

imgui_app.cpp: header.txt $(CPP) src/imgui_app.cpp 
	@cat header.txt > $@
	@echo "#define SOKOL_IMPL\n#define SOKOL_NO_ENTRY\n\n" >> $@
	@echo "#define SOKOL_IMPL\n#define SOKOL_WIN32_FORCE_MAIN\n\n" >> $@
	@cat $(CPP) >> $@
# imgui_internal, only replace the first time, remove the other includes
	@sed -e '0,/#include "imgui_internal.h"/{ /#include "imgui_internal.h"/{' -e 'r imgui/imgui_internal.h' -e 'd' -e '}}' -i $@
	@sed -e 's/#include "imgui_internal.h"//' -i $@
# Other dependencies:
	@sed -e '/#include "imstb_textedit.h"/ {' -e 'r imgui/imstb_textedit.h' -e 'd' -e '}' -i $@
	@sed -e '/#include "imstb_rectpack.h"/ {' -e 'r imgui/imstb_rectpack.h' -e 'd' -e '}' -i $@
	@sed -e '/#include "imstb_truetype.h"/ {' -e 'r imgui/imstb_truetype.h' -e 'd' -e '}' -i $@
	@cat src/imgui_app.cpp >> $@


clean:
	@rm -f imgui_app.cpp imgui.h imgui_app.tgz header.txt
