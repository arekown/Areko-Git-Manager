cmake_minimum_required(VERSION 3.21)
project(ArekoGitManager VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
include(GNUInstallDirs)

option(AGM_BUILD_TESTS "Build the tests" ON)

find_package(Qt6 6.8 REQUIRED COMPONENTS Core Gui Qml Quick Concurrent LinguistTools)
qt_standard_project_setup(REQUIRES 6.8 I18N_SOURCE_LANGUAGE de I18N_TRANSLATED_LANGUAGES en es it zh_CN ja)

set(APP_ID de.areko.GitManager)

# Sources and QML files are globbed so parallel work on separate files never conflicts here.
file(GLOB AGM_SOURCES CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp ${CMAKE_CURRENT_SOURCE_DIR}/src/*.h)
list(FILTER AGM_SOURCES EXCLUDE REGEX "/main\\.cpp$")
file(GLOB AGM_QML RELATIVE ${CMAKE_CURRENT_SOURCE_DIR} CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/qml/*.qml ${CMAKE_CURRENT_SOURCE_DIR}/qml/*.js)
set_source_files_properties(qml/Theme.qml PROPERTIES QT_QML_SINGLETON_TYPE TRUE)

qt_add_library(agm_core STATIC)
qt_add_qml_module(agm_core
    URI ArekoGit
    VERSION 1.0
    OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/ArekoGit
    QML_FILES ${AGM_QML}
    SOURCES ${AGM_SOURCES}
    RESOURCES
        fonts/Orbitron-Variable.ttf
        fonts/Rajdhani-Medium.ttf
        fonts/Rajdhani-SemiBold.ttf
        fonts/Rajdhani-Bold.ttf
        fonts/ShareTechMono-Regular.ttf
        icons/${APP_ID}.svg
)
target_include_directories(agm_core PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)
target_link_libraries(agm_core PUBLIC Qt6::Gui Qt6::Qml Qt6::Quick Qt6::Concurrent)

qt_add_executable(areko-git-manager src/main.cpp)
target_compile_definitions(areko-git-manager PRIVATE AGM_VERSION="${PROJECT_VERSION}")
target_link_libraries(areko-git-manager PRIVATE agm_core agm_coreplugin)

# UI texts are German in the sources; i18n/agm_<lang>.ts hold the other languages (lupdate: target update_translations).
qt_add_translations(areko-git-manager
    SOURCE_TARGETS agm_core
    TS_FILE_BASE agm
    TS_FILE_DIR i18n
    RESOURCE_PREFIX /i18n
)

if(AGM_BUILD_TESTS)
    find_package(Qt6 REQUIRED COMPONENTS Test)
    enable_testing()
    # one executable per tests/tst_*.cpp
    file(GLOB AGM_TESTS CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/tests/tst_*.cpp)
    foreach(t ${AGM_TESTS})
        get_filename_component(n ${t} NAME_WE)
        qt_add_executable(${n} ${t})
        target_link_libraries(${n} PRIVATE agm_core agm_coreplugin Qt6::Test)
        target_compile_definitions(${n} PRIVATE AGM_SOURCE_DIR="${CMAKE_CURRENT_SOURCE_DIR}")
        add_test(NAME ${n} COMMAND ${n})
        set_tests_properties(${n} PROPERTIES ENVIRONMENT "QT_QPA_PLATFORM=offscreen" TIMEOUT 120)
    endforeach()
endif()

install(TARGETS areko-git-manager RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR})
configure_file(data/${APP_ID}.desktop.in ${CMAKE_CURRENT_BINARY_DIR}/${APP_ID}.desktop @ONLY)
install(FILES ${CMAKE_CURRENT_BINARY_DIR}/${APP_ID}.desktop DESTINATION ${CMAKE_INSTALL_DATADIR}/applications)
install(FILES icons/${APP_ID}.svg DESTINATION ${CMAKE_INSTALL_DATADIR}/icons/hicolor/scalable/apps)
